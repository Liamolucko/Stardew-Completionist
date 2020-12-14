<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import IconButton from "@smui/icon-button";
  import { onMount, setContext } from "svelte";
  import backend from "../backend";
  import ItemInfo from "../components/ItemInfo.svelte";
  import SaveSelect from "../components/SaveSelect.svelte";
  import type { Item } from "../game-info";
  import save, { getSaveFile } from "../save";

  // A warning is thrown in the browser console if I don't declare this, so it's here even if I don't use it.
  export let segment;
  // Stop Svelte complaining it's unused.
  segment;

  let saveSelect: SaveSelect;

  let itemInfoDialog: Dialog;
  let selectedItem: Item;
  setContext("item-info-dialog", {
    open(item: Item) {
      selectedItem = item;
      itemInfoDialog.open();
    },
  });

  let introDialog: Dialog;
  onMount(() => {
    if (!localStorage.getItem("hasSeenIntro")) {
      introDialog.open();
      localStorage.setItem("hasSeenIntro", "true");
    }
  });
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;

    overflow: auto;

    .nav-rail {
      width: 56px + 1px;
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
          image-rendering: crisp-edges;
          image-rendering: pixelated;
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

      overflow: auto;

      &.border {
        border-top: 1px solid;
        border-color: rgba(0, 0, 0, 0.12);
      }
    }
  }
</style>

<div class="container">
  <nav class="nav-rail">
    <div class="nav-section top-section">
      <IconButton class="material-icons rail-button" href="dashboard">
        dashboard
      </IconButton>
      {#each ['shipping', 'fish', 'artifacts', 'minerals', 'cooking', 'crafting', 'bundles', 'friendship'] as page}
        <IconButton class="rail-button" href={page}>
          <img width="24" height="24" src="{page}.png" alt="{page} icon" />
        </IconButton>
      {/each}
    </div>
    <div class="nav-section bottom-section">
      {#if $save && $save.handle}
        <IconButton
          class="material-icons rail-button"
          on:click={async () => {
            if (typeof $save.handle !== 'string') {
              if ((await $save.handle.requestPermission({
                  mode: 'read',
                })) === 'denied') return;
            }
            save.set(await getSaveFile($save.handle));
          }}>
          refresh
        </IconButton>
      {/if}
      <IconButton
        class="material-icons rail-button"
        on:click={() => saveSelect.open()}>
        folder
      </IconButton>
    </div>
  </nav>

  <main
    class:border={typeof backend !== 'undefined' && /Windows(?: NT)? 10\.0/.test(navigator.userAgent)}>
    <slot />
  </main>
</div>

<Dialog bind:this={itemInfoDialog}>
  <ItemInfo item={selectedItem} />
</Dialog>

<SaveSelect bind:this={saveSelect} />

<Dialog bind:this={introDialog}>
  <Title>Welcome</Title>
  <Content>
    <p>
      Welcome to Stardew Completionist! This is an app which analyzes your
      Stardew Valley save file and tells you what you've yet to do. It can also
      act as somewhat of a streamlined wiki.
    </p>
    <p>
      You can select your save file using the folder icon in the bottom left.
    </p>
  </Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>
