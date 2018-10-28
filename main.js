/* eslint-disable */
// Basic init
const electron = require('electron');
const path = require('path');
const os = require('os');
const storage = require('electron-json-storage');


const storagePath = path.join(os.homedir(), 'dyna');

storage.setDataPath(storagePath);

const { app, BrowserWindow } = electron;
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'app', 'electron', 'dist'),
});

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 750,
    minHeight: 600,
    show: false,
    center: true,
    title: 'dyna',
    nodeIntegrationInWorker: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: true,
      textAreasAreResizable: false,
    },
    icon: path.join(__dirname, 'resources/dynaLogoCircle.png'),
  });

  const splash = new BrowserWindow({
    width: 810,
    minWidth: 810,
    height: 500,
    minHeight: 500,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, 'resources/dynaLogoCircle.png'),
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

  webContents.on('will-navigate', handleRedirect);
  webContents.on('new-window', handleRedirect);

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.on('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });
  mainWindow.on('focus', () => {
    splash.destroy();
  });
  global.serverHost = 'http://localhost:7000';
  const env = process.env.NODE_ENV || 'PROD';
  console.log('ELECTRON RUNNING IN', env);
  if (env === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/web/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/web');
  }
});
