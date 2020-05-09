var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './release/package/EAU-win32-x64',
    outputDirectory: './release/installer',
    authors: 'Me',
    exe: 'EAU.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));