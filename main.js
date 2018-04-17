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
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  global.serverHost = 'http://localhost:7000';

  if (process.env.NODE_ENV === 'PROD') {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:8080/dist/');
  }
});

