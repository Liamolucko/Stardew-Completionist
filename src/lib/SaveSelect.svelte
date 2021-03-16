<script lang="ts">
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
  import backend from "./backend";
  import save, {
    getSaveFile,
    getSaveFiles,
    isValidSaveFile,
    processSaveFile,
  } from "./save";
  import type { SaveInfo } from "./save";

  export let active = false;

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

  let fileInput: HTMLInputElement;

  let options: Promise<SaveInfo[] | null>;

  // Undefined means it's probably set on the backend but we don't know it,
  // null means it's been intentionally unset.
  let savesDir: string | null | undefined =
    globalThis.localStorage?.getItem("savesDir") ?? undefined;

  $: {
    if (savesDir !== null) {
      options = getSaveFiles(savesDir)
        .then((saves) => saves.sort((a, b) => b.lastSaved - a.lastSaved))
        .catch(() => null);
    } else {
      options = Promise.resolve(null);
    }
  }
</script>

<input
  on:change={async () => {
    if (fileInput.files === null) return;
    // Make Svelte shut up about DOMParser not being defined
    const contents = new globalThis.DOMParser().parseFromString(
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
      {#if options === null || options.length === 0}
        <CardText>
          {#if backend}
            <p>
              {#if savesDir === null}
                Please choose your Stardew Valley saves directory.
              {:else if savesDir === undefined}
                There aren't any valid save files in the default Stardew Valley
                save file location. Do you have them in a custom location?
              {:else if options?.length === 0}
                {savesDir} does not contain any valid Stardew Valley save files.
                Please choose another.
              {:else}
                {savesDir} is an invalid save file path. Please choose another.
              {/if}
            </p>
          {:else if platformName !== null}
            <p>
              Please select your save file.
              {#if platformName}
                On {platformName}, this is typically located at
                <kbd>{savePath}</kbd>.
              {/if}
            </p>
            {#if platformName === "Windows"}
              <p>
                Paste <kbd>{savesDirPath}</kbd> into the address bar at the top
                of Explorer and press <kbd>Enter</kbd> to navigate to
                <kbd>Saves</kbd>.
              </p>
            {:else if platformName === "macOS"}
              <p>
                Press <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>G</kbd> to open Go To
                Folder and paste <kbd>{savesDirPath}</kbd> into it, then press
                <kbd>Enter</kbd>
                to navigate to <kbd>Saves</kbd>.
              </p>
            {/if}
            {#if !backend && (platformName === "Windows" || platformName === "macOS")}
              <p>
                Then navigate to your chosen save file and choose the file with
                the same name as the enclosing folder.
              </p>
            {/if}
          {/if}
        </CardText>
        <CardActions>
          <Button text on:click={() => (active = false)}>Cancel</Button>
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
                if (backend) {
                  savesDir = await backend.chooseFolder();
                  localStorage.setItem("savesDir", savesDir);
                } else {
                  fileInput.click();
                }
              }}
            >
              Choose {#if backend}directory{:else}file{/if}
            </Button>
          {/if}
        </CardActions>
      {:else}
        <List>
          {#each options as option}
            <ListItem
              active={option.handle === $save?.handle}
              on:click={async () => {
                save.set(await getSaveFile(option.handle));
                active = false;
              }}
            >
              <img
                slot="prepend"
                src={option.sprite}
                alt={option.name}
                class="mr-2"
              />
              {option.name}
            </ListItem>
          {/each}
        </List>
        <CardActions>
          <Button
            text
            on:click={() => {
              console.log("button pressed");
              savesDir = null;
            }}
          >
            Change directory
          </Button>
        </CardActions>
      {/if}
    {/await}
  </Card>
</Dialog>
