const { autoUpdater } = require('electron-updater');// eslint-disable-next-line
const { ipcMain } = require('electron');
const logger = require('electron-log');
// eslint-disable-next-line
const { dialog } = require('electron');

exports.runUpdater = (eventSender) => {
  autoUpdater.logger = logger;

  logger.info(autoUpdater.checkForUpdatesAndNotify());
  logger.info('checkForUpdatesAndNotify');

  autoUpdater.on('update-available', (arg) => {
    logger.info('update-available');
    logger.info(arg);
    eventSender.send('UPDATE_AVAILABLE');
  });

  autoUpdater.on('update-not-available', (arg) => {
    logger.info('update-not-available');
    logger.info(arg);
    eventSender.send('UPDATE_NOT_AVAILABLE');
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
};
