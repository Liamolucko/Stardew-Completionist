import { app, BrowserWindow, session, shell } from "electron";
import * as path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow(): void {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "backend.js"),
      contextIsolation: true,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
    show: false,
    icon: process.platform === "win32"
      ? "www\\favicon.ico"
      : "www/logo-192.png",
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "../www/index.html"));

  win.once("ready-to-show", win.show);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (process.env.NODE_ENV === "production") {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "script-src app: 'unsafe-inline' 'unsafe-eval'; default-src app: data: 'unsafe-inline'",
          ],
        },
      });
    });
  }

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("web-contents-created", (_event, contents) => {
  contents.on("new-window", (event, url) => {
    if (!url.startsWith(`app://`)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});
