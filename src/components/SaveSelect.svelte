<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import List, { Item as ListItem, Text } from "@smui/list";
  import "blob-polyfill";
  import localForage from "localforage";
  import backend from "../backend";
  import type { Handle, SaveInfo } from "../save";
  import save, {
    getSaveFile,
    getSaveFiles,
    isValidSaveFile,
    processSaveFile,
  } from "../save";

  if ((process as NodeJS.Process & { browser: boolean }).browser) {
    import("@material/mwc-circular-progress");
  }

  let dialog: Dialog;

  const platformName =
    typeof navigator === "undefined"
      ? null
      : navigator.platform.startsWith("Win")
      ? "Windows"
      : navigator.platform.startsWith("Mac")
      ? "macOS"
      : navigator.platform.startsWith("Linux")
      ? "Linux"
      : null;

  const savesDirPath =
    typeof navigator === "undefined"
      ? null
      : navigator.platform.startsWith("Win")
      ? "%APPDATA%\\StardewValley\\Saves"
      : "~/.config/StardewValley/Saves";

  const savePath =
    typeof navigator === "undefined"
      ? null
      : navigator.platform.startsWith("Win")
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

  export async function open() {
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

    dialog.open();
  }

  export function close() {
    dialog.close();
  }
</script>

<style>
  input + :global(* .mdc-dialog__surface) {
    transition: width 0.5s, height 0.5s;
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

<Dialog bind:this={dialog}>
  <Title>Select Save File</Title>
  {#await options}
    <div
      style="outline: none; margin: auto; width: 100px; height: 100px; overflow: hidden"
      tabindex="0">
      <!-- Just writing `indeterminate` makes Svelte interpret it as "". -->
      <mwc-circular-progress indeterminate={true} />
    </div>
  {:then options}
    {#if options === null}
      <Content>
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
      </Content>
      <Actions>
        <Button>
          <Label>Cancel</Label>
        </Button>
        {#if savesDirPath !== null}
          <Button
            action={null}
            on:click={() => navigator.clipboard.writeText(savesDirPath)}>
            <Label>Copy path</Label>
          </Button>
          <Button
            action={null}
            on:click={async () => {
              if (typeof backend !== 'undefined') {
                setSavesDir(await backend.chooseFolder());
              } else if (typeof globalThis.showDirectoryPicker !== 'undefined' && platformName !== 'Windows') {
                setSavesDir(await globalThis.showDirectoryPicker());
              } else {
                fileInput.click();
              }
            }}>
            <Label>
              Choose
              {#if hasBackend}directory{:else}file{/if}
            </Label>
          </Button>
        {/if}
      </Actions>
    {:else}
      <Content>
        <List>
          {#each options as option}
            {#await $save !== null && (typeof option.handle === 'string' ? option.handle === $save.handle : option.handle.isSameEntry($save.handle)) then selected}
              <ListItem
                {selected}
                on:click={async () => {
                  save.set(await getSaveFile(option.handle));
                  close();
                }}>
                <Text>{option.name}</Text>
              </ListItem>
            {/await}
          {/each}
        </List>
      </Content>
      <Actions>
        <Button
          on:click={() => {
            savesDir = null;
            options = null;
          }}>
          <Label>Change directory</Label>
        </Button>
      </Actions>
    {/if}
  {/await}
</Dialog>
