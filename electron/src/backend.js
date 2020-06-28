const { contextBridge } = require('electron');
const { readdir, readFile } = require('fs').promises;
const path = require('path');

contextBridge.exposeInMainWorld('backend', {
  getSaveFiles: async url => {
    if (!url) {
      switch (process.platform) {
        case 'win32':
        case 'cygwin':
          url = path.join(process.env.APPDATA, 'StardewValley\\Saves');
          break;
        case 'android':
          break;
        default:
          url = path.join(process.env.HOME, '.config/StardewValley/Saves');
          break;
      }
    }

    const saves = await readdir(url)
      .catch(() => { throw new Error(`'${url}' is not a directory`); });
    return Promise.all(saves.map(save =>
      readFile(path.join(url, save, 'SaveGameInfo'), { encoding: 'utf-8' })
        .catch(() => {
          throw Error(`Saves directory contains invalid save file ${save}`);
        })
    ));
  }
});