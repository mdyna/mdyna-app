
/* eslint-disable */
var electronInstaller = require('electron-winstaller');
var MdynaPath = '/home/david/projects/dyna/';
var resultPromise = electronInstaller.createWindowsInstaller({
      appDirectory: MdynaPath,
      outputDirectory: MdynaPath + 'builds',
      authors: 'David Morais',
      exe: 'dyna.exe'
    });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));