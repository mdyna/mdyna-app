/* eslint-disable */
// Basic init
const electron = require('electron');
const { dialog } = require('electron');
const path = require('path');
const Storage = require('electron-store');
const logger = require('electron-log');
const { autoUpdater } = require('electron-updater');



const { app, BrowserWindow } = electron;
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'app', 'electron', 'dist'),
});

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  logger.log('Main Electron Logs');
  logger.error('Main Electron Logs');
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 900,
    minWidth: 350,
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

  const webContents = mainWindow.webContents;

  const handleRedirect = (e, url) => {
    if (url !== webContents.getURL()) {
      e.preventDefault();
      electron.shell.openExternal(url);
    }
  };


  autoUpdater.logger = logger

  autoUpdater.on('update-available', arg => {
      logger.info('update-available');
      logger.info(arg);
  });

  autoUpdater.on('update-not-available', arg => {
      logger.info('update-not-available');
      logger.info(arg);
  });

  autoUpdater.on('download-progress', arg => {
      logger.log('download-progress');
      logger.log(arg);
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', error => {
      logger.error('error');
      logger.error(error.message);
      logger.error(error.stack);
  });


  webContents.on('will-navigate', handleRedirect);
  webContents.on('new-window', handleRedirect);

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
    window = null;
  });

  global.appVersion = `v.${app.getVersion()}`
  global.serverHost = 'http://localhost:7000';
  const userStorage = new Storage();
  const userSettings = userStorage.get('settings');
  const cwd = userSettings && userSettings.cwd || electron.app.getAppPath();
  global.cardStorage = new Storage({
    name: 'mdyna-user-data',
    cwd,
  })
  globa.cwd = cwd;
  global.userStorage = userStorage;
  const env = process.env.NODE_ENV || 'PROD';
  console.warn('ELECTRON RUNNING IN', env);
  if (env === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/web/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/web');
  }
});
