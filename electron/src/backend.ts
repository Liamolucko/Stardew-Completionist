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

async function getSaveIDs(url = savesDir): Promise<string[] | null> {
  if (url === null) return null;

  return await readdir(url)
    .catch(() => {
      throw new Error(`'${url}' is not a directory`);
    });
}

async function getSaveFile(id: string) {
  return readFile(path.join(savesDir, id, id), { encoding: "utf-8" });
}

contextBridge.exposeInMainWorld("backend", {
  async chooseFolder(defaultPath?: string) {
    return await dialog.showOpenDialog(
      { properties: ["openDirectory"], defaultPath },
    ).then((value) => value.filePaths[0] ?? null);
  },

  getSaveFile,

  async getSaveFiles() {
    const ids = await getSaveIDs(savesDir);
    if (ids === null) throw Error("No saves directory found");

    return await Promise.all(ids.map(async (id) => ({
      id: path.parse(id).name,
      data: await getSaveFile(id).catch(() => null),
    }))).then((saves) =>
      saves.filter((save): save is { id: string; data: string } =>
        save.data !== null
      )
    );
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
