// Basic init
// eslint-disable-next-line
const electron = require('electron');
// eslint-disable-next-line
const { dialog, ipcMain, remote } = require('electron');
const path = require('path');
const Storage = require('electron-store');
const logger = require('electron-log');
const { autoUpdater } = require('electron-updater');
const uniqBy = require('lodash/uniqBy');

const { app, BrowserWindow } = electron;
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'app', 'electron', 'dist'),
});

function loadLabels(cards) {
  const labels = [];
  if (cards && cards.length) {
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const cardLabels = card.labels;
      const labelTitleMaps = labels.map(l => l.title);
      if (cardLabels && cardLabels.length) {
        console.log(cardLabels, cardLabels.length);
        for (
          let cardLabelIndex = 0;
          cardLabelIndex < cardLabels.length;
          cardLabelIndex += 1
        ) {
          const labelTitle = cardLabels[cardLabelIndex].title;
          const labelIndex = labelTitleMaps.indexOf(labelTitle);
          console.log(labelTitle, labelTitleMaps, labelIndex);
          if (labelIndex === -1) {
            console.log('added ', labelTitle);
            labels.push({
              title: labelTitle,
              count: 1,
            });
          } else if (labels && labels[labelIndex]) {
            labels[labelIndex].count += 1;
          }
        }
      }
    }
  }
  return labels;
}

function loadBoards(boards) {
  logger.log('LOADING BOARDS', boards);

  return {
    boardList: [...new Set(boards)],
    boardNames:
      boards && boards ? [...boards.map(b => b && b.name)] : ['INBOX'],
  };
}

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  logger.log('Main Electron Logs');
  logger.error('Main Electron Logs');
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 900,
    minWidth: 500,
    minHeight: 600,
    show: false,
    center: true,
    frame: false,
    title: 'mdyna',
    nodeIntegrationInWorker: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: true,
      textAreasAreResizable: false,
    },
    icon: path.join(__dirname, 'resources/MdynaLogoCircle.png'),
  });

  const splash = new BrowserWindow({
    width: 510,
    minWidth: 510,
    height: 400,
    minHeight: 400,
    transparent: true,
    frame: false,
    icon: path.join(__dirname, 'resources/MdynaLogoCircle.png'),
  });

  splash.loadURL(`file://${__dirname}/splash.html`);
  splash.show();

  const { webContents } = mainWindow;

  const handleRedirect = (e, url) => {
    if (url !== webContents.getURL()) {
      e.preventDefault();
      electron.shell.openExternal(url);
    }
  };

  autoUpdater.logger = logger;

  autoUpdater.on('update-available', (arg) => {
    logger.info('update-available');
    logger.info(arg);
  });

  autoUpdater.on('update-not-available', (arg) => {
    logger.info('update-not-available');
    logger.info(arg);
  });

  autoUpdater.on('download-progress', (arg) => {
    logger.log('download-progress');
    logger.log(arg);
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: releaseName,
      detail:
        'A new version has been downloaded. Restart the application to apply the updates.',
    };

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (error) => {
    logger.error('error');
    logger.error(error.message);
    logger.error(error.stack);
  });

  webContents.on('will-navigate', handleRedirect);
  webContents.on('new-window', handleRedirect);

  const getCwd = storage => (storage && storage.cwd)
    || ((remote && remote.app) || electron.app).getPath('userData');
  const getUniqCardsById = cardsArray => uniqBy(cardsArray, 'id');

  const userStorage = new Storage({
    cwd: getCwd(),
  });
  const userSettings = userStorage.get('settings');
  const cwd = getCwd(userSettings);
  const userState = userStorage.get('state');
  const userCardsInStorage = (userState && userState.cards) || [];
  const createCardStorage = directory => directory
    && new Storage({
      name: 'mdyna-card-data',
      cwd: directory,
    });
  const cardStorage = createCardStorage(cwd);
  logger.log('CARD STORAGE IN ', cwd);
  const tempState = userStorage.get('tmp/state');
  const cardStorageState = cardStorage.get('state');
  const cardStorageBoardList = cardStorageState
    && cardStorageState.boards
    && cardStorageState.boards.boardList;

  const convertedBoards = [];
  if (!Array.isArray(cardStorageBoardList)) {
    const contentBoards = (cardStorageBoardList && Object.keys(cardStorageBoardList)) || [];
    for (let i = 0; i < contentBoards.length; i += 1) {
      convertedBoards.push(contentBoards);
    }
  } else {
    for (let i = 0; i < cardStorageBoardList.length; i += 1) {
      const contentBoard = cardStorageBoardList[i];
      if (contentBoard.name !== 'INBOX') {
        convertedBoards.push(contentBoard);
      }
    }
  }

  const tempBoards = tempState && tempState.boards && tempState.boards.boardList;
  if (
    (tempState && Object.keys(tempState).length)
    || (userCardsInStorage && userCardsInStorage.length)
  ) {
    logger.log('MASHING TMP STATE');
    const userStorageBoardList = userState && userState.boards && userState.boards.boardList;
    // * Mash temp state agaisnt current state
    const currentCards = cardStorageState
      && cardStorageState.cards
      && getUniqCardsById([
        ...tempState.cards,
        ...cardStorageState.cards,
        ...userCardsInStorage,
      ]);
    cardStorage.set('state', {
      cards: currentCards || tempState.cards,
      labels: loadLabels(currentCards) || [],
      boards: loadBoards([
        ...(userStorageBoardList || []),
        ...convertedBoards,
        ...tempBoards,
      ]),
    });

    // * Clear tmp/state key
    userStorage.delete('tmp/state');
  } else {
    logger.log('MASHING USR STATE');
    const userStorageBoardList = userState && userState.boards && userState.boards.boardList;
    const uniqCards = getUniqCardsById([
      ...userCardsInStorage,
      ...((cardStorageState && cardStorageState.cards) || []),
    ]) || tempState.cards;
    cardStorage.set('state', {
      cards: uniqCards,
      labels: loadLabels(uniqCards) || [],
      boards: loadBoards([
        ...(userStorageBoardList || []),
        ...convertedBoards,
        ...(tempBoards || []),
      ]),
    });
    userStorage.delete('state');
  }
  global.cardStorage = cardStorage;
  global.userStorage = userStorage;

  // * CHANGE CWD EVENT
  ipcMain.on('CHANGED-CWD', () => {
    logger.info('CURRENT WORKING DIRECTORY CHANGED');
    const currentUserState = cardStorage.get('state');
    const newCwd = getCwd(userStorage.get('settings'));
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
    electron.app.relaunch();
    mainWindow.destroy();
  });

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.on('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();

    logger.info(autoUpdater.checkForUpdatesAndNotify());
    logger.info('checkForUpdatesAndNotify');
  });
  mainWindow.on('focus', () => {
    splash.destroy();
  });
  mainWindow.on('close', () => {
    app.quit();
    // eslint-disable-next-line
    window = null;
  });

  global.appVersion = `v.${app.getVersion()}`;
  global.serverHost = 'http://localhost:7000';
  const env = process.env.NODE_ENV || 'PROD';
  logger.warn('ELECTRON RUNNING IN', env);
  logger.info('LOADED USER STATE', cardStorage.get('state'));
  if (env === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/web/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/web');
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
