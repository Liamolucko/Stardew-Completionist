<script context="module" lang="ts">
  import gameInfo from '../game-info';

  export async function preload() {
    await gameInfo.fetch(this.fetch);
  }
</script>

<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Dialog, { Actions, Content, Title } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import List, { Item as ListItem, Text } from '@smui/list';
  import { setContext } from 'svelte';
  import backend from '../backend';
  import ItemInfo from '../components/ItemInfo.svelte';
  import type { Item } from '../game-info';
  import save, {
    getSaveFiles,
    processSaveFile,
    isValidSaveFile,
  } from '../save-info';
  import type { SaveInfo } from '../save-info';
  import Textfield from '@smui/textfield';

  const platformName = !process.browser
    ? null
    : navigator.platform.startsWith('Win')
    ? 'Windows'
    : navigator.platform.startsWith('Mac')
    ? 'macOS'
    : navigator.platform.startsWith('Linux')
    ? 'Linux'
    : null;

  const savesDirPath = !process.browser
    ? null
    : navigator.platform.startsWith('Win')
    ? '%APPDATA%\\StardewValley\\Saves'
    : '~/.config/StardewValley/Saves';

  const savePath = !process.browser
    ? null
    : navigator.platform.startsWith('Win')
    ? '%APPDATA%\\StardewValley\\Saves\\<save>\\SaveGameInfo'
    : '~/.config/StardewValley/Saves/<save>/SaveGameInfo';

  let saveSelectDialog: Dialog;
  let fileInput: HTMLInputElement;

  let itemInfoDialog: Dialog;
  let selectedItem: Item;
  setContext('item-info-dialog', {
    open(item: Item) {
      selectedItem = item;
      itemInfoDialog.open();
    },
  });

  let customSavesDir = globalThis.localStorage?.getItem('customSavesDir') ?? '';
  let usingCustomDir = customSavesDir !== '';
  let saves = (typeof backend !== 'undefined'
    ? getSaveFiles(customSavesDir === '' ? undefined : customSavesDir)
    : null) as Promise<SaveInfo[]>; // This is only ever used if the backend is defined
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;

    .nav-rail {
      width: 56px + 1px;
      height: 100%;
      padding: 8px 0;

      border-right: 1px solid;
      border-color: rgba(0, 0, 0, 0.12);
      background-color: white;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .nav-section {
        width: 56px;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        img {
          display: block;
        }

        :global(.rail-button) {
          margin: 4px;
        }
      }

      .bottom-section {
        margin-top: auto;
      }
    }

    main {
      flex-grow: 1;

      height: 100%;

      overflow: auto;

      background-color: #fafafa;

      &.electron {
        border-top: 1px solid;
        border-color: rgba(0, 0, 0, 0.12);
      }
    }
  }

  .path-select {
    width: 100%;

    display: flex;
    flex-flow: row nowrap;

    align-items: center;
  }
</style>

<div class="container">
  <nav class="nav-rail">
    <div class="nav-section top-section">
      <IconButton class="material-icons rail-button" href="dashboard">
        dashboard
      </IconButton>
      {#each ['shipping', 'fish', 'artifacts', 'minerals', 'cooking', 'crafting', 'friendship'] as page}
        <IconButton class="rail-button" href={page}>
          <img src="{page}.png" alt="{page} icon" />
        </IconButton>
      {/each}
    </div>
    <div class="nav-section bottom-section">
      <IconButton
        class="material-icons rail-button"
        on:click={() => saveSelectDialog.open()}>
        folder
      </IconButton>
    </div>
  </nav>

  <main class:electron={typeof backend !== 'undefined'}>
    <slot />
  </main>
</div>

<Dialog bind:this={itemInfoDialog}>
  <ItemInfo item={selectedItem} />
</Dialog>

<Dialog bind:this={saveSelectDialog}>
  <Title>Select Save File</Title>
  {#if typeof backend === 'undefined'}
    <Content>
      {#if platformName !== null && savePath !== null}
        <p>
          Please select your save file. On {platformName}, this is typically
          located at
          <code>{savePath}</code>
          .
        </p>
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
        {#if platformName === 'Windows' || platformName === 'macOS'}
          Then navigate to your chosen save file and choose
          <code>SaveGameInfo</code>
          .
        {/if}
      {:else}
        <p>Please select your save file.</p>
      {/if}
    </Content>
    <Actions>
      {#if typeof backend === 'undefined'}
        <Button>
          <Label>Cancel</Label>
        </Button>
        {#if savesDirPath !== null}
          <Button
            action={null}
            on:click={() => navigator.clipboard.writeText(savesDirPath)}>
            <Label>Copy path</Label>
          </Button>
          <Button action={null} on:click={() => fileInput.click()}>
            <Label>Choose file</Label>
          </Button>
        {/if}
      {/if}
    </Actions>
  {:else}
    {#await saves}
      <Content>Loading...</Content>
    {:then saveOptions}
      <Content>
        <List>
          {#each saveOptions as saveOption}
            <ListItem
              selected={$save !== null && saveOption.id === $save.id}
              on:click={() => {
                save.set(saveOption.id);
                saveSelectDialog.close();
              }}>
              <Text>{saveOption.name}</Text>
            </ListItem>
          {/each}
        </List>
      </Content>
    {:catch error}
      <Content>
        <p>
          {#if usingCustomDir}
            {customSavesDir} is an invalid save file path. Please choose
            another.
          {:else}
            Your save files aren't located in the default Stardew Valley save
            location. Please select their location manually.
          {/if}
        </p>
        <div class="path-select">
          <Textfield
            bind:value={customSavesDir}
            type="url"
            style="flex-grow: 1" />
          <IconButton
            class="material-icons"
            on:click={async () => {
              const path = await backend.chooseFolder(customSavesDir);
              if (path !== null) customSavesDir = path;
            }}>
            folder
          </IconButton>
        </div>
      </Content>
      <Actions>
        <Button
          action={null}
          on:click={() => {
            backend.setSavesDir(customSavesDir);
            saves = getSaveFiles();
            usingCustomDir = true;
            saves.then(() => {
              localStorage.setItem('customSavesDir', customSavesDir);
            });
          }}>
          <Label>Submit</Label>
        </Button>
      </Actions>
    {/await}
  {/if}
</Dialog>

<input
  on:change={async (event) => {
    if (event.target.files === null) return;
    const contents = await event.target.files[0].text();
    if (!isValidSaveFile(contents)) return;
    save.set(await processSaveFile(contents));
    event.target.value = '';
    saveSelectDialog.close();
  }}
  bind:this={fileInput}
  type="file"
  style="display: none" />
