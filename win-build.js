
/* eslint-disable */
var electronInstaller = require('electron-winstaller');
var dynaPath = '/home/david/projects/dyna/';
var resultPromise = electronInstaller.createWindowsInstaller({
      appDirectory: dynaPath,
      outputDirectory: dynaPath + 'builds',
      authors: 'David Morais',
      exe: 'dyna.exe'
    });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));