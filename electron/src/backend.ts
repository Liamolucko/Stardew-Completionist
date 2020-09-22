import { contextBridge, remote } from "electron";
import { promises, watch } from "fs";
import * as path from "path";
import { readable } from "svelte/store";
const { readdir, readFile } = promises;
const { dialog } = remote;

let savesDir: string;

switch (process.platform) {
  case "win32":
  case "cygwin":
    if (typeof process.env.APPDATA === "undefined") break;
    savesDir = path.join(process.env.APPDATA, "StardewValley\\Saves");
    break;
  default:
    if (typeof process.env.HOME === "undefined") break;
    savesDir = path.join(process.env.HOME, ".config/StardewValley/Saves");
    break;
}

contextBridge.exposeInMainWorld("backend", {
  chooseFolder(defaultPath?: string) {
    return dialog.showOpenDialog({
      properties: ["openDirectory"],
      defaultPath,
    }).then((value) => value.filePaths[0] ?? null);
  },

  getSaveInfo(id: string) {
    return readFile(path.join(savesDir, id, "SaveGameInfo"), {
      encoding: "utf-8",
    });
  },

  getSaveFile(id: string) {
    return readFile(path.join(savesDir, id, id), { encoding: "utf-8" });
  },

  listSaveFiles(url = savesDir): Promise<string[]> {
    return readdir(url)
      .catch(() => {
        throw new Error(`'${url}' is not a directory`);
      });
  },

  async watchSaveFile(id: string) {
    const savePath = path.join(savesDir, id, id);

    return readable<string>(
      await readFile(savePath, { encoding: "utf-8" }),
      (set) => {
        const watcher = watch(savePath, async () => {
          set(await readFile(savePath, { encoding: "utf-8" }));
        });

        return function stop() {
          watcher.close();
        };
      },
    );
  },

  setSavesDir(url: string) {
    savesDir = url;
  },
});
