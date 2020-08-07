declare namespace backend {
  function chooseFolder(defaultPath?: string): Promise<string>;
  function getSaveFile(id: string): Promise<string>;
  function getSaveFiles(): Promise<Array<{id: string, data: string}>>;
  function watchSaveFile(id: string): Promise<import('svelte/store').Readable<string>>;
  function setSavesDir(url: string): void;
}