<script lang="ts">
  import "@material/mwc-button";
  import "@material/mwc-dialog";
  import type { Dialog } from "@material/mwc-dialog";
  import "@material/mwc-icon-button";
  import { onMount, setContext } from "svelte";
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import backend from "./backend.js";
  import type { Item } from "./game-info.js";
  import gameInfo from "./game-info.js";
  import ItemInfo from "./ItemInfo.svelte";
  import Bundles from "./pages/Bundles.svelte";
  import Collection from "./pages/Collection.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Fallback from "./pages/Fallback.svelte";
  import Friendship from "./pages/Friendship.svelte";
  import Redirect from "./pages/Redirect.svelte";
  import save, { getSaveFile } from "./save.js";
  import SaveSelect from "./SaveSelect.svelte";
  import "./global.css";

  const routes = {
    "/": Redirect,
    "/dashboard": Dashboard,
    "/shipping": wrap({
      component: Collection,
      props: { title: "Items Shipped", items: gameInfo.shipping },
    }),
    "/fish": wrap({
      component: Collection,
      props: { title: "Fish", items: gameInfo.fish },
    }),
    "/artifacts": wrap({
      component: Collection,
      props: { title: "Artifacts", items: gameInfo.artifacts },
    }),
    "/minerals": wrap({
      component: Collection,
      props: { title: "Minerals", items: gameInfo.minerals },
    }),
    "/cooking": wrap({
      component: Collection,
      props: {
        title: "Cooking",
        recipes: gameInfo.cooking,
        items: gameInfo.cooking.map((recipe) => recipe.result),
      },
    }),
    "/crafting": wrap({
      component: Collection,
      props: {
        title: "Crafting",
        recipes: gameInfo.crafting,
        items: gameInfo.crafting.map((recipe) => recipe.result),
      },
    }),
    "/bundles": Bundles,
    "/friendship": Friendship,
    "*": Fallback,
  };

  let introDialog: Dialog;
  onMount(() => {
    if (
      !localStorage.getItem("hasSeenIntro") &&
      !navigator.userAgent.includes("jsdom")
    ) {
      introDialog.show();
      localStorage.setItem("hasSeenIntro", "true");
    }
  });

  let itemInfoDialog: ItemInfo;
  let selectedItem: Item;
  setContext("item-info-dialog", {
    open(item: Item) {
      selectedItem = item;
      itemInfoDialog.open();
    },
  });

  let saveSelect: SaveSelect;

  if (
    "serviceWorker" in navigator &&
    location.protocol.startsWith("http") &&
    !import.meta.hot
  ) {
    import("workbox-window").then(({ Workbox }) => {
      const wb = new Workbox("../sw.js");
      wb.register();
    });
  }
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

        .rail-button {
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

  mwc-dialog > p:not(:last-of-type) {
    margin-bottom: 16px;
  }

  a {
    display: contents;
    color: inherit;
  }

  a:visited {
    color: inherit;
  }
</style>

<div class="container">
  <div class="nav-rail">
    <div class="nav-section top-section">
      <a href="#/dashboard">
        <mwc-icon-button class="rail-button" icon="dashboard" />
      </a>
      {#each ['shipping', 'fish', 'artifacts', 'minerals', 'cooking', 'crafting', 'bundles', 'friendship'] as page}
        <a href="#/{page}">
          <mwc-icon-button class="rail-button">
            <img
              width="24"
              height="24"
              src="./images/{page}.png"
              alt="{page} icon" />
          </mwc-icon-button>
        </a>
      {/each}
    </div>
    <div class="nav-section bottom-section">
      {#if $save?.handle != null}
        <mwc-icon-button
          class="rail-button"
          icon="refresh"
          on:click={async () => {
            if (typeof $save.handle !== 'string') {
              const state = await $save.handle.requestPermission({
                mode: 'read',
              });
              if (state === 'denied') return;
            }
            save.set(await getSaveFile($save.handle));
          }} />
      {/if}
      <mwc-icon-button
        class="rail-button"
        icon="folder"
        on:click={saveSelect.show} />
    </div>
  </div>
  <main
    class:border={typeof backend !== 'undefined' && /Windows(?: NT)? 10\.0/.test(navigator.userAgent)}>
    <Router {routes} />
  </main>
</div>

<mwc-dialog heading="Welcome" bind:this={introDialog}>
  <p>
    Welcome to Stardew Completionist! This is an app which analyzes your Stardew
    Valley save file and tells you what you've yet to do. It can also act as
    somewhat of a streamlined wiki.
  </p>
  <p>You can select your save file using the folder icon in the bottom left.</p>
  <mwc-button slot="primaryAction" dialogAction="close">Close</mwc-button>
</mwc-dialog>

<ItemInfo item={selectedItem} bind:this={itemInfoDialog} />

<SaveSelect bind:this={saveSelect} />
