const { app, BrowserWindow } = require('electron');

const electron = require('electron');

const squirrelUrl = "https://github.com/VedranKapor/electron-autoupdate-wininstaller.git";

const startAutoUpdater = (squirrelUrl) => {
  // The Squirrel application will watch the provided URL
  //electron.autoUpdater.setFeedURL(`${squirrelUrl}/win64/`);
  electron.autoUpdater.setFeedURL({ 
      provider: 'github'
    , owner: 'VedranKapor'
    , repo: 'https://github.com/VedranKapor/electron-autoupdate-wininstaller.git'
    , token: 'ca44137151d356d42d1626ec992f4c2a936b7aac'
     });

  // Display a success message on successful update
  electron.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName) => {
    electron.dialog.showMessageBox({"message": `The release ${releaseName} has been downloaded`});
  });

  // Display an error message on update error
  electron.autoUpdater.addListener("error", (error) => {
    electron.dialog.showMessageBox({"message": "Auto updater error: " + error});
  });

  // tell squirrel to check for updates
  electron.autoUpdater.checkForUpdates();
}

// app.on('ready', function (){
//   // Add this condition to avoid error when running your application locally
//   // if (process.env.NODE_ENV !== "dev") startAutoUpdater(squirrelUrl)
// });

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (process.env.NODE_ENV !== "dev") startAutoUpdater(squirrelUrl)
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

const handleSquirrelEvent = () => {
  if (process.argv.length === 1) {
    return false;
  }

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
    case '--squirrel-uninstall':
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
}
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}