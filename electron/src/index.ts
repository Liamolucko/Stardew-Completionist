import { app, BrowserWindow, shell } from 'electron';
import { existsSync as exists } from 'fs';
import * as path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup') || !app.requestSingleInstanceLock()) { // eslint-disable-line global-require
  app.quit();
} else {
  // Fix CWD
  if (!exists('static')) {
    process.chdir(path.join(process.cwd(), 'resources', 'app'));
  }

  // Run server
  require('../../__sapper__/build');
}


function createWindow(): void {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'backend.js'),
      contextIsolation: true,
      enableRemoteModule: true
    },
    autoHideMenuBar: true,
    show: false,
    icon: process.platform === 'win32' ? 'static\\favicon.ico' : 'static/logo-192.png'
  });

  win.once('ready-to-show', win.show);

  // and load the index.html of the app.
  win.loadURL(`http://localhost:${process.env.PORT ?? 3000}`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('web-contents-created', (_event, contents) => {
  contents.on('new-window', (event, url) => {
    if (!url.startsWith(`http://localhost:${process.env.PORT}`)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});

app.on('second-instance', () => {
  createWindow();
});
