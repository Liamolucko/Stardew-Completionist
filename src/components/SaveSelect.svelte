<script lang="ts">
  import localForage from "localforage";
  import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Dialog,
    List,
    ListItem,
    ProgressCircular,
  } from "svelte-materialify";
  import backend from "../backend";
  import type { Handle, SaveInfo } from "../save";
  import save, {
    getSaveFile,
    getSaveFiles,
    isValidSaveFile,
    processSaveFile,
  } from "../save";

  let active = false;

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

    active = true;
  }

  export function close() {
    active = false;
  }
</script>

<input
  on:change={async () => {
    if (fileInput.files === null) return;
    const contents = new DOMParser().parseFromString(
      await fileInput.files[0].text(),
      "text/xml"
    );
    if (!isValidSaveFile(contents)) return;
    save.set(await processSaveFile(contents));
    fileInput.value = "";
    active = false;
  }}
  bind:this={fileInput}
  type="file"
  class="d-none"
/>

<Dialog bind:active>
  <Card>
    <CardTitle>Select Save File</CardTitle>
    {#await options}
      <div
        style="outline: none; margin: auto; width: 100px; height: 100px; overflow: hidden"
        tabindex="0"
      >
        <ProgressCircular indeterminate />
      </div>
    {:then options}
      {#if options === null}
        <CardText>
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
            {#if platformName === "Windows"}
              <p>
                Paste
                <code>{savesDirPath}</code>
                into the address bar at the top of Explorer and press
                <kbd>Enter</kbd>
                to navigate to
                <code>Saves</code>
                .
              </p>
            {:else if platformName === "macOS"}
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
            {#if !hasBackend && (platformName === "Windows" || platformName === "macOS")}
              Then navigate to your chosen save file and choose the file with
              the same name as the enclosing folder.
            {/if}
          {:else}
            <p>Please select your save file.</p>
          {/if}
        </CardText>
        <CardActions>
          <Button text on:click={close}>Cancel</Button>
          {#if savesDirPath !== null}
            <Button
              text
              on:click={() => navigator.clipboard.writeText(savesDirPath)}
            >
              Copy path
            </Button>
            <Button
              text
              on:click={async () => {
                if (typeof backend !== "undefined") {
                  setSavesDir(await backend.chooseFolder());
                } else if (
                  typeof globalThis.showDirectoryPicker !== "undefined" &&
                  platformName !== "Windows"
                ) {
                  setSavesDir(await globalThis.showDirectoryPicker());
                } else {
                  fileInput.click();
                }
              }}
            >
              Choose
              {#if hasBackend}directory{:else}file{/if}
            </Button>
          {/if}
        </CardActions>
      {:else}
        <CardText>
          <List>
            {#each options as option}
              {#await $save !== null && (typeof option.handle === "string" ? option.handle === $save.handle : option.handle.isSameEntry($save.handle)) then selected}
                <ListItem
                  {selected}
                  on:click={async () => {
                    save.set(await getSaveFile(option.handle));
                    close();
                  }}
                >
                  <img src={option.sprite} alt={option.name} />
                  <span class="pa-4">{option.name}</span>
                </ListItem>
              {/await}
            {/each}
          </List>
        </CardText>
        <CardActions>
          <Button
            text
            on:click={() => {
              savesDir = null;
              options = null;
            }}
          >
            Change directory
          </Button>
        </CardActions>
      {/if}
    {/await}
  </Card>
</Dialog>
