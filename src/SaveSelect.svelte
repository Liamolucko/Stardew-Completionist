<script lang="ts">
  import "@material/mwc-button";
  import "@material/mwc-circular-progress";
  import "@material/mwc-dialog";
  import type { Dialog } from "@material/mwc-dialog";
  import "@material/mwc-list/mwc-list-item.js";
  import "@material/mwc-list/mwc-list.js";
  import localForage from "localforage";
  import backend from "./backend";
  import type { Handle, SaveInfo } from "./save";
  import save, {
    getSaveFile,
    getSaveFiles,
    isValidSaveFile,
    processSaveFile,
  } from "./save";

  let dialog: Dialog;

  const platformName = navigator.platform.startsWith("Win")
    ? "Windows"
    : navigator.platform.startsWith("Mac")
    ? "macOS"
    : navigator.platform.startsWith("Linux")
    ? "Linux"
    : null;

  const savesDirPath = navigator.platform.startsWith("Win")
    ? "%APPDATA%\\StardewValley\\Saves"
    : "~/.config/StardewValley/Saves";

  const savePath = navigator.platform.startsWith("Win")
    ? "%APPDATA%\\StardewValley\\Saves\\<save>\\<save>"
    : "~/.config/StardewValley/Saves/<save>/<save>";

  const hasBackend =
    (typeof globalThis.showDirectoryPicker !== "undefined" &&
      platformName !== "Windows") ||
    typeof backend !== "undefined";

  let fileInput: HTMLInputElement;

  let options: Promise<SaveInfo[] | null> = Promise.resolve(null);

  let savesDir: Handle | null = null;
  function setSavesDir(dir: Handle) {
    savesDir = dir;
    localForage.setItem("savesDir", dir);
    options = getSaveFiles(dir)
      .then((saves) => saves.sort((a, b) => b.lastSaved - a.lastSaved))
      .catch(() => null);
  }

  export async function show() {
    if (savesDir === null) {
      const dir = await localForage.getItem<Handle>("savesDir");

      if (dir !== null) {
        if (typeof dir === "string") {
          setSavesDir(dir);
        } else {
          if ((await dir.requestPermission({ mode: "read" })) === "granted") {
            setSavesDir(dir);
          }
        }
      }
    }

    dialog.show();
  }

  export function close() {
    dialog.close();
  }
</script>

<style lang="scss">
  mwc-list-item {
    --mdc-list-item-graphic-margin: 0px;
    --mdc-list-item-graphic-size: 36px;

    img {
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      width: 20px;
      height: 34px;
    }
  }

  mwc-circular-progress {
    margin: 8px 92px 0;
  }
</style>

<input
  on:change={async () => {
    if (fileInput.files === null) return;
    const contents = new DOMParser().parseFromString(await fileInput.files[0].text(), 'text/xml');
    if (!isValidSaveFile(contents)) return;
    save.set(await processSaveFile(contents));
    fileInput.value = '';
    dialog.close();
  }}
  bind:this={fileInput}
  type="file"
  style="display: none" />

<mwc-dialog heading="Select Save File" bind:this={dialog}>
  <mwc-button slot="secondaryAction" dialogAction="close">Cancel</mwc-button>
  {#await options}
    <!-- Just writing `indeterminate` makes Svelte interpret it as "". -->
    <mwc-circular-progress indeterminate={true} />
  {:then options}
    {#if options === null}
      {#if platformName !== null}
        {#if hasBackend}
          {#if savesDir === null}
            <p>
              Please select your saves directory. On
              {platformName}, this is typically located at
              <code>{savesDirPath}</code>
              .
            </p>
          {:else}
            {savesDir}
            is an invalid save file path. Please choose another.
          {/if}
        {:else}
          <p>
            Please select your save file. On
            {platformName}, this is typically located at
            <code>{savePath}</code>
            .
          </p>
        {/if}
        {#if platformName === 'Windows'}
          <p>
            Paste
            <code>{savesDirPath}</code>
            into the address bar at the top of Explorer and press
            <kbd>Enter</kbd>
            to navigate to
            <code>Saves</code>
            .
          </p>
        {:else if platformName === 'macOS'}
          <p>
            Press
            <kbd>⇧</kbd>
            +
            <kbd>⌘</kbd>
            +
            <kbd>G</kbd>
            to open Go To Folder and paste
            <code>{savesDirPath}</code>
            into it, then press
            <kbd>Enter</kbd>
            to navigate to
            <code>Saves</code>
            .
          </p>
        {/if}
        {#if !hasBackend && (platformName === 'Windows' || platformName === 'macOS')}
          Then navigate to your chosen save file and choose the file with the
          same name as the enclosing folder.
        {/if}
      {:else}
        <p>Please select your save file.</p>
      {/if}
      {#if savesDirPath !== null}
        <mwc-button
          slot="secondaryAction"
          on:click={() => navigator.clipboard.writeText(savesDirPath)}>
          Copy path
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          on:click={async () => {
            if (typeof backend !== 'undefined') {
              setSavesDir(await backend.chooseFolder());
            } else if (typeof globalThis.showDirectoryPicker !== 'undefined' && platformName !== 'Windows') {
              setSavesDir(await globalThis.showDirectoryPicker());
            } else {
              fileInput.click();
            }
          }}>
          Choose
          {#if hasBackend}directory{:else}file{/if}
        </mwc-button>
      {/if}
    {:else}
      <mwc-list activatable>
        {#each options as option}
          {#await $save !== null && (typeof option.handle === 'string' ? option.handle === $save.handle : option.handle.isSameEntry($save.handle)) then selected}
            <mwc-list-item
              {selected}
              activated={selected}
              graphic="icon"
              on:click={async () => {
                save.set(await getSaveFile(option.handle));
                close();
              }}>
              <img
                width="20"
                height="34"
                slot="graphic"
                src={option.sprite}
                alt={option.name} />
              {option.name}
            </mwc-list-item>
          {/await}
        {/each}
      </mwc-list>
      <mwc-button
        slot="primaryAction"
        on:click={() => {
          savesDir = null;
          options = null;
        }}>
        Change directory
      </mwc-button>
    {/if}
  {/await}
</mwc-dialog>
