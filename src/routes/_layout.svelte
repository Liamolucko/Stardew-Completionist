<script context="module" lang="ts">
  declare var process: { browser: boolean };

  export async function preload(_: unknown, session: unknown) {
    return session;
  }
</script>

<script lang="ts">
  import { mdiFolder, mdiRefresh, mdiViewDashboard } from "@mdi/js";
  import { onMount, setContext } from "svelte";
  import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Dialog,
    Icon,
    MaterialApp,
  } from "svelte-materialify";
  import backend from "../backend";
  import ItemInfo from "../components/ItemInfo.svelte";
  import SaveSelect from "../components/SaveSelect.svelte";
  import type { Item } from "../game-info.js";
  import save, { getSaveFile } from "../save";
  import type { SaveGame } from "../save";
  import * as cookie from "cookie";
  import * as cborg from "cborg";
  import * as base64 from "base64-js";

  // A warning is thrown in the browser console if I don't declare this, so it's here even if I don't use it.
  export let segment;
  // Stop Svelte complaining it's unused.
  segment;

  export let lastSave: SaveGame | null;

  if (lastSave) {
    save.set(lastSave);
  } else if (process.browser) {
    // If this is being used without SSR, we need to check the cookie on the client side.
    const cookies = cookie.parse(document.cookie);
    if (cookies.save) {
      save.set(cborg.decode(base64.toByteArray(cookies.save)));
    }
  }

  let saveSelect: SaveSelect;

  let itemInfoOpen = false;
  let selectedItem: Item;
  setContext("item-info-dialog", {
    open(item: Item) {
      selectedItem = item;
      itemInfoOpen = true;
    },
  });

  let introOpen = false;
  onMount(() => {
    if (!localStorage.getItem("hasSeenIntro")) {
      introOpen = true;
      localStorage.setItem("hasSeenIntro", "true");
    }
  });
</script>

<MaterialApp>
  <div class="container">
    <nav class="nav-rail">
      <div class="nav-section top-section">
        <a href="dashboard">
          <Button class="rail-button" icon size="large">
            <Icon path={mdiViewDashboard} />
          </Button>
        </a>
        {#each ["shipping", "fish", "artifacts", "minerals", "cooking", "crafting", "bundles", "friendship"] as page}
          <a href={page}>
            <Button class="rail-button" icon size="large">
              <img
                width="24"
                height="24"
                src="./images/{page}.png"
                alt="{page} icon"
              />
            </Button>
          </a>
        {/each}
      </div>
      <div class="nav-section bottom-section">
        {#if $save && $save.handle}
          <Button
            class="rail-button"
            icon
            size="large"
            on:click={async () => {
              if (typeof $save.handle !== "string") {
                if (
                  (await $save.handle.requestPermission({
                    mode: "read",
                  })) === "denied"
                )
                  return;
              }
              save.set(await getSaveFile($save.handle));
            }}
          >
            <Icon path={mdiRefresh} />
          </Button>
        {/if}
        <Button
          class="rail-button"
          on:click={() => saveSelect.open()}
          icon
          size="large"
        >
          <Icon path={mdiFolder} />
        </Button>
      </div>
    </nav>

    <main
      class:border={typeof backend !== "undefined" &&
        /Windows(?: NT)? 10\.0/.test(navigator.userAgent)}
    >
      <slot />
    </main>
  </div>

  <Dialog bind:active={itemInfoOpen} class="pl-4 pb-4 pr-4">
    <ItemInfo item={selectedItem} />
  </Dialog>

  <SaveSelect bind:this={saveSelect} />

  <Dialog bind:active={introOpen}>
    <Card>
      <CardTitle>Welcome</CardTitle>
      <CardText>
        <p>
          Welcome to Stardew Completionist! This is an app which analyzes your
          Stardew Valley save file and tells you what you've yet to do. It can
          also act as somewhat of a streamlined wiki.
        </p>
        <p class="mb-0">
          You can select your save file using the folder icon in the bottom
          left.
        </p>
      </CardText>
      <CardActions>
        <Button text on:click={() => (introOpen = false)}>Close</Button>
      </CardActions>
    </Card>
  </Dialog>
</MaterialApp>

<style lang="scss">
  .container {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;

    overflow: auto;

    .nav-rail {
      width: 56px + 1px;
      padding: 8px 0;

      border-right: 1px solid;
      border-color: rgba(0, 0, 0, 0.12);
      background-color: var(--theme-navigation-drawer);

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

  a {
    color: inherit;
  }

  :global {
    // Copied from the theme--dark class.
    @media (prefers-color-scheme: dark) {
      .s-app {
        --theme-surface: #212121;
        --theme-icons-active: #fff;
        --theme-icons-inactive: hsla(0, 0%, 100%, 0.5);
        --theme-text-primary: #fff;
        --theme-text-secondary: hsla(0, 0%, 100%, 0.7);
        --theme-text-disabled: hsla(0, 0%, 100%, 0.5);
        --theme-text-link: #82b1ff;
        --theme-inputs-box: #fff;
        --theme-buttons-disabled: hsla(0, 0%, 100%, 0.3);
        --theme-tabs: hsla(0, 0%, 100%, 0.6);
        --theme-text-fields-filled: hsla(0, 0%, 100%, 0.08);
        --theme-text-fields-filled-hover: hsla(0, 0%, 100%, 0.16);
        --theme-text-fields-outlined: hsla(0, 0%, 100%, 0.24);
        --theme-text-fields-outlined-disabled: hsla(0, 0%, 100%, 0.16);
        --theme-text-fields-border: hsla(0, 0%, 100%, 0.7);
        --theme-controls-disabled: hsla(0, 0%, 100%, 0.3);
        --theme-controls-thumb-inactive: #bdbdbd;
        --theme-controls-thumb-disabled: #424242;
        --theme-controls-track-inactive: hsla(0, 0%, 100%, 0.3);
        --theme-controls-track-disabled: hsla(0, 0%, 100%, 0.1);
        --theme-tables-active: #505050;
        --theme-tables-hover: #616161;
        --theme-tables-group: #616161;
        --theme-dividers: hsla(0, 0%, 100%, 0.12);
        --theme-chips: #555;
        --theme-cards: #1e1e1e;
        --theme-app-bar: #272727;
        --theme-navigation-drawer: #363636;
        background-color: var(--theme-surface);
        color: var(--theme-text-primary);
      }

      .s-app a {
        color: #82b1ff;
      }

      .s-app .text--primary {
        color: var(--theme-text-primary);
      }

      .s-app .text--secondary {
        color: var(--theme-text-secondary);
      }

      .s-app .text--disabled {
        color: var(--theme-text-disabled);
      }
    }
  }
</style>
