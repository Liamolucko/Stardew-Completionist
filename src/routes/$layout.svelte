<script context="module" lang="ts">
  type Loaded = {
    status?: number;
    error?: Error | string;
    redirect?: string;
    maxage?: number;
    props?: Record<string, any>;
    context?: Record<string, any>;
  };

  export function load({ session }: { session: Record<string, any> }): Loaded {
    return { props: session };
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
  import backend from "$lib/backend";
  import ItemInfo from "$lib/ItemInfo.svelte";
  import SaveSelect from "$lib/SaveSelect.svelte";
  import type { Item } from "$lib/game-info";
  import type { SaveGame } from "$lib/save";
  import save, { getSaveFile } from "$lib/save";
  // svelte-materialify requires this to be able to tab through buttons
  import "focus-visible";

  // A warning is thrown in the browser console if I don't declare this, so it's here even if I don't use it.
  export let segment;
  // Stop Svelte complaining it's unused.
  segment;

  export let lastSave: SaveGame | null;

  if (lastSave) {
    save.set(lastSave);
  } else if ("localStorage" in globalThis) {
    const stored = localStorage.getItem("save");
    if (stored) {
      save.set(JSON.parse(stored));
    }
  }

  let saveSelectOpen = false;

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
        <a href="/dashboard" tabindex="-1">
          <Button class="rail-button" icon size="large" aria-label="Dashboard">
            <Icon path={mdiViewDashboard} />
          </Button>
        </a>
        {#each ["shipping", "fish", "artifacts", "minerals", "cooking", "crafting", "bundles", "friendship"] as page}
          <a href="/{page}" tabindex="-1">
            <Button class="rail-button" icon size="large">
              <img
                width="24"
                height="24"
                src="./images/{page}.png"
                alt={page}
              />
            </Button>
          </a>
        {/each}
      </div>
      <div class="nav-section bottom-section">
        {#if $save?.handle}
          <Button
            class="rail-button"
            icon
            size="large"
            on:click={async () => {
              if (!$save?.handle) return;
              save.set(await getSaveFile($save.handle));
            }}
          >
            <Icon path={mdiRefresh} />
          </Button>
        {/if}
        <Button
          class="rail-button"
          on:click={() => (saveSelectOpen = true)}
          icon
          size="large"
          aria-label="Choose Save File"
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

  <SaveSelect bind:active={saveSelectOpen} />

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
        --theme-surface: #212121 !important;
        --theme-icons-active: #fff !important;
        --theme-icons-inactive: hsla(0, 0%, 100%, 0.5) !important;
        --theme-text-primary: #fff !important;
        --theme-text-secondary: hsla(0, 0%, 100%, 0.7) !important;
        --theme-text-disabled: hsla(0, 0%, 100%, 0.5) !important;
        --theme-text-link: #82b1ff !important;
        --theme-inputs-box: #fff !important;
        --theme-buttons-disabled: hsla(0, 0%, 100%, 0.3) !important;
        --theme-tabs: hsla(0, 0%, 100%, 0.6) !important;
        --theme-text-fields-filled: hsla(0, 0%, 100%, 0.08) !important;
        --theme-text-fields-filled-hover: hsla(0, 0%, 100%, 0.16) !important;
        --theme-text-fields-outlined: hsla(0, 0%, 100%, 0.24) !important;
        --theme-text-fields-outlined-disabled: hsla(
          0,
          0%,
          100%,
          0.16
        ) !important;
        --theme-text-fields-border: hsla(0, 0%, 100%, 0.7) !important;
        --theme-controls-disabled: hsla(0, 0%, 100%, 0.3) !important;
        --theme-controls-thumb-inactive: #bdbdbd !important;
        --theme-controls-thumb-disabled: #424242 !important;
        --theme-controls-track-inactive: hsla(0, 0%, 100%, 0.3) !important;
        --theme-controls-track-disabled: hsla(0, 0%, 100%, 0.1) !important;
        --theme-tables-active: #505050 !important;
        --theme-tables-hover: #616161 !important;
        --theme-tables-group: #616161 !important;
        --theme-dividers: hsla(0, 0%, 100%, 0.12) !important;
        --theme-chips: #555 !important;
        --theme-cards: #1e1e1e !important;
        --theme-app-bar: #272727 !important;
        --theme-navigation-drawer: #363636 !important;
        background-color: var(--theme-surface) !important;
        color: var(--theme-text-primary) !important;
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

  :global(.s-btn) {
    outline: none;
  }
</style>
