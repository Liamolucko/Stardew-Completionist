<script context="module" lang="ts">
  import gameInfo from "../game-info";

  export async function preload() {
    await gameInfo.fetch(this.fetch);
  }
</script>

<script lang="ts">
  import Dialog from "@smui/dialog";
  import IconButton from "@smui/icon-button";
  import { setContext } from "svelte";
  import backend from "../backend";
  import ItemInfo from "../components/ItemInfo.svelte";
  import SaveSelect from "../components/SaveSelect.svelte";
  import type { Item } from "../game-info";
  import save, { getSaveFile } from "../save";

  // unused
  export let segment;

  let saveSelect: SaveSelect;

  let itemInfoDialog: Dialog;
  let selectedItem: Item;
  setContext("item-info-dialog", {
    open(item: Item) {
      selectedItem = item;
      itemInfoDialog.open();
    },
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
      {#if $save !== null && $save.handle !== null}
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
