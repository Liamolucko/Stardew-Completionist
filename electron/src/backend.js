const { contextBridge } = require('electron');
const { watchFile } = require('fs');
const { readdir, readFile } = require('fs').promises;
const path = require('path');
const { merge, bindCallback } = require('rxjs');
const { map } = require('rxjs/operators');

const watchFileObservable = bindCallback(watchFile);

function getDefaultSavePath() {
  switch (process.platform) {
    case 'win32':
    case 'cygwin':
      return path.join(process.env.APPDATA, 'StardewValley\\Saves');
    default:
      return path.join(process.env.HOME, '.config/StardewValley/Saves');
  }
}

async function getSavePaths(url = getDefaultSavePath()) {
  return await readdir(url)
    .catch(() => { throw new Error(`'${url}' is not a directory`); })
    .then(paths => paths.map(filePath => path.join(url, filePath)));
}

contextBridge.exposeInMainWorld('backend', {
  getSaveFiles: async (url = getDefaultSavePath()) => {
    const saves = await getSavePaths(url);

    return Promise.all(saves.map(save =>
      readFile(path.join(save, 'SaveGameInfo'), { encoding: 'utf-8' })
        .catch(() => {
          throw new Error(`Saves directory contains invalid save file ${save}`);
        })
    ));
  },
  watchSaveFiles: async (url = getDefaultSavePath()) => {
    const saves = await getSavePaths(url);

    return merge(...saves.map(savePath => watchFileObservable(savePath)))
      .pipe(map(() => { })); // Just send events, not stats
  }
});