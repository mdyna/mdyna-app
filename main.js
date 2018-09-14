// Basic init
const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = electron;
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'src', 'electron', 'dist'),
});

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 750,
    minHeight: 600,
    center: true,
    title: 'dyna',
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: process.env.NODE_ENV === 'DEV',
      textAreasAreResizable: false,
    },
    icon: path.join(__dirname, 'assets/dynaLogoCircle.png'),
  });
  const webContents = mainWindow.webContents;

  const handleRedirect = (e, url) => {
    if (url !== webContents.getURL()) {
      e.preventDefault();
      electron.shell.openExternal(url);
    }
  };

  webContents.on('will-navigate', handleRedirect);
  webContents.on('new-window', handleRedirect);

  const splash = new BrowserWindow({
    width: 810,
    minWidth: 810,
    height: 610,
    minHeight: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(`file://${__dirname}/src/splash.html`);
  splash.show();

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.on('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });
  mainWindow.on('focus', () => {
    splash.destroy();
  });
  global.serverHost = 'http://localhost:7000';

  if (process.env.NODE_ENV === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/');
  }
});
