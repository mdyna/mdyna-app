// Basic init
// eslint-disable-next-line
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

const {
  remote,
  app,
  BrowserWindow,
  shell,
  Menu,
  // eslint-disable-next-line
} = require('electron');
const path = require('path');
const os = require('os');
const Storage = require('electron-store');
const logger = require('electron-log');
const { autoUpdater } = require('electron-updater');
const uniqBy = require('lodash/uniqBy');
const { loadBoards, loadFavs, loadLabels } = require('./main/loaders');
const { startEventListeners } = require('./main/events');
const { runUpdater } = require('./main/updater');


// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'app', 'electron', 'dist'),
});

const env = process.env.NODE_ENV || 'PROD';
const MDYNA_WINDOW_OPTIONS = {
  width: 1024,
  height: 900,
  minWidth: 500,
  minHeight: 600,
  show: false,
  center: true,
  frame: false,
  title: 'MDyna',
  nodeIntegrationInWorker: true,
  titleBarStyle: 'hidden',
  webPreferences: {
    devTools: true,
    textAreasAreResizable: false,
  },
  icon: path.join(__dirname, 'resources/Logo.png'),
};

const SPLASH_WINDOW_OPTIONS = {
  width: 510,
  minWidth: 510,
  height: 400,
  minHeight: 400,
  transparent: true,
  frame: false,
  icon: path.join(__dirname, 'resources/Logo.png'),
};

// To avoid being garbage collected
let mainWindow;

app.on('ready', async () => {
  logger.log('Main Electron Logs');
  logger.error('Main Electron Logs');
  mainWindow = new BrowserWindow(MDYNA_WINDOW_OPTIONS);

  const splash = new BrowserWindow(SPLASH_WINDOW_OPTIONS);


  if (env === 'DEV') {
    await
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }


  splash.loadURL(`file://${__dirname}/splash.html`);
  splash.show();

  runUpdater();

  const { webContents } = mainWindow;

  const handleRedirect = (e, url) => {
    if (url !== webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };

  webContents.on('will-navigate', handleRedirect);
  webContents.on('new-window', handleRedirect);

  const getCwd = storage => (storage && storage.cwd)
    || ((remote && remote.app) || app).getPath('userData');
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
  const cardStorageFavs = (cardStorageState && cardStorageState.favs) || [];
  const convertedBoards = [];
  if (cardStorageBoardList) {
    for (let i = 0; i < cardStorageBoardList.length; i += 1) {
      const contentBoard = cardStorageBoardList[i];
      if (
        convertedBoards.map(cb => cb.name).indexOf(contentBoard.name) === -1
      ) {
        convertedBoards.push(contentBoard);
      }
    }
  }

  const tempBoards = tempState && tempState.boards && tempState.boards.boardList;
  const tempFavs = (tempState && tempState.favs) || [];
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
      favs: loadFavs([...cardStorageFavs, ...tempFavs]),
      boards: loadBoards([
        ...(userStorageBoardList || []),
        ...convertedBoards,
        ...tempBoards,
      ]),
    });

    // * Clear tmp/state key
    userStorage.delete('tmp/state');
  } else {
    logger.log('MASHING USR STATE', userState);
    const userStorageBoardList = userState && userState.boards && userState.boards.boardList;
    const uniqCards = getUniqCardsById([
      ...userCardsInStorage,
      ...((cardStorageState && cardStorageState.cards) || []),
    ]) || tempState.cards;
    cardStorage.set('state', {
      cards: uniqCards,
      favs: loadFavs([
        ...((userState && userState.favs) || []),
        ...cardStorageFavs,
        ...tempFavs,
      ]),
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
  let controlStyle = null;
  const osType = os.type().toLowerCase();
  if (osType) {
    switch (osType) {
      case 'darwin':
        controlStyle = null;
        break;
      case 'windows_nt':
        controlStyle = 'Windows';
        break;
      default:
        controlStyle = 'Linux';
        break;
    }
    if (osType.includes('windows')) {
      controlStyle = 'Windows';
    }
  }
  global.controlsStyle = controlStyle;
  if (osType === 'darwin') {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: 'MDyna',
          submenu: [
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
        {
          label: 'File',
          submenu: [{ role: 'close' }],
        },
        {
          label: 'View',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
          ],
        },
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' },
          ],
        },
        {
          label: 'Window',
          submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ],
        },
      ]),
    );
  }
  startEventListeners({ cardStorage, userStorage }, cwd, mainWindow);

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
  logger.warn('ELECTRON RUNNING IN', env);
  if (env === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/web/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/web');
    logger.info('LOADED USER STATE', cardStorage.get('state'));
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
