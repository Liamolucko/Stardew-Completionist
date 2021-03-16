import type { Readable } from "svelte/store";

declare global {
  namespace backend {
    function chooseFolder(defaultPath?: string): Promise<string>;
    function getSaveInfo(id: string): Promise<string>;
    function getSaveFile(id: string): Promise<string>;
    function listSaveFiles(): Promise<string[]>;
    function watchSaveFile(id: string): Promise<Readable<string>>;
    function setSavesDir(url: string): void;
  }
}

export default globalThis.backend;
