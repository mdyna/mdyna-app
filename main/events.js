const { app, dialog, ipcMain } = require('electron');
const Storage = require('electron-store');
const jetpack = require('fs-jetpack');
const path = require('path');
const logger = require('electron-log');

module.exports = function startEventListeners(storages, cwd, mainWindow) {
  const { userStorage, cardStorage } = storages;

  // * EXPORT BOARD EVENT
  ipcMain.on('EXPORT_BOARD', (e, board) => {
    logger.log('Exporting cards from ', board, ' board');
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'openDirectory'],
      },
      (files) => {
        const exportDirectory = files && files[0];
        const exportAllCards = Boolean(board === 'INBOX');
        if (exportDirectory) {
          logger.log('Exporting cards to ', exportDirectory);
          const userCards = cardStorage.get('state').cards;
          for (let i = 0; i <= userCards.length; i += 1) {
            const card = userCards[i];
            if (card) {
              const cardTitle = card && card.title;
              const cardPath = path.join(exportDirectory, `${cardTitle}.md`);
              if (exportAllCards || card.board === board) {
                logger.log('Exporting card ', cardTitle, 'to', cardPath);
                jetpack.write(cardPath, card.text);
              }
            }
          }
        }
      },
    );
  });
  // * IMPORT FILES EVENT
  ipcMain.on('IMPORT_FILES', (event) => {
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'multiSelections'],
      },
      (files) => {
        const cards = [];
        for (let i = 0; i < files.length; i += 1) {
          const filePath = files[i];
          const file = jetpack.read(filePath);
          const fileTitle = filePath.split('/')
            && filePath.split('/').length
            && filePath.split('/')[filePath.split('/').length - 1];
          const fileExtension = filePath.split('.')
            && filePath.split('.').length
            && filePath.split('.')[filePath.split('.').length - 1];
          if (fileExtension.toLowerCase() === 'md') {
            cards.push({
              title: fileTitle.split('.')[0],
              text: file,
            });
          }
          logger.log('IMPORTING CARDS', fileTitle, fileExtension);
        }
        event.sender.send('IMPORT_FILES_REPLY', cards);
      },
    );
  });

  ipcMain.on('CHANGED-CWD', () => {
    logger.info('CURRENT WORKING DIRECTORY CHANGED');
    const currentUserState = cardStorage.get('state');
    const newCwd = userStorage.get('settings').cwd;
    const newCardStorage = new Storage({
      name: 'mdyna-card-data',
      newCwd,
    });
    logger.info('PORTING STATE FROM OLD CWD [', cwd, '] TO [', newCwd, ']');
    logger.log(newCardStorage.get('state'), cardStorage.get('state'));
    if (currentUserState) {
      logger.log('SET TEMP STATE', currentUserState, 'INTO TMP/STATE');
      userStorage.set('tmp/state', currentUserState);
    }
    logger.log('NEW STORAGE STATE', newCardStorage.get('state'));
    logger.info('RELAUNCHING APP');
    app.relaunch();
    mainWindow.destroy();
  });
};
