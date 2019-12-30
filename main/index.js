// Basic init
const {
  remote, app, BrowserWindow, shell,
} = require('electron');
const path = require('path');
const Storage = require('electron-store');
const logger = require('electron-log');
const { autoUpdater } = require('electron-updater');
const uniqBy = require('lodash/uniqBy');
const { loadBoards, loadFavs, loadLabels } = require('./loaders');
const startEventListeners = require('./events');
const runUpdater = require('./updater');

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'app', 'electron', 'dist'),
});

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

app.on('ready', () => {
  logger.log('Main Electron Logs');
  logger.error('Main Electron Logs');
  mainWindow = new BrowserWindow(MDYNA_WINDOW_OPTIONS);

  const splash = new BrowserWindow(SPLASH_WINDOW_OPTIONS);

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
  if (!Array.isArray(cardStorageBoardList)) {
    const contentBoards = (cardStorageBoardList && Object.keys(cardStorageBoardList)) || [];
    for (let i = 0; i < contentBoards.length; i += 1) {
      convertedBoards.push(contentBoards);
    }
  } else {
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
