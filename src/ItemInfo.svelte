<script lang="ts">
  import { MDCDialog } from "@material/dialog";
  import "@material/dialog/dist/mdc.dialog.min.css";
  import "@material/mwc-icon-button";
  import { onDestroy, onMount } from "svelte";
  import gameInfo from "./game-info";
  import { categories, locationNames, weatherNames } from "./names";

  export let item = gameInfo.items["24"];

  function calcProbability(probability: number): number {
    return Math.round((probability + Number.EPSILON) * 10000000) / 100000;
  }

  let dialogElement: Element;
  let dialog: MDCDialog;
  onMount(() => {
    dialog = new MDCDialog(dialogElement);
  });

  onDestroy(() => dialog?.destroy());

  export function open() {
    dialog?.open();
  }
</script>

<!-- This isn't really a dialog, more of a modal, and so I can't really do this with the regular mwc-dialog. -->
<div class="mdc-dialog" bind:this={dialogElement}>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface" role="alertdialog" aria-modal="true">
      <div class="mdc-dialog__title header">
        <img
          class="dialog-icon"
          src="data:image/png;base64,{item.sprite}"
          alt={item.name}
          width={item.isCraftable ? 32 : 48}
          height={item.isCraftable ? 64 : 48}
        />
        <span>{item.name}</span>
        <a href={item.url} target="_blank" rel="noreferrer">
          <mwc-icon-button icon="launch" tabindex="0" />
        </a>
      </div>
      <div class="mdc-dialog__content content">
        {#if typeof item.seasons !== "undefined"}
          <div class="mdc-card section section seasons">
            <h2 class="mdc-typography--subtitle2">Seasons</h2>
            <ul class="mdc-typography--body2">
              {#if item.seasons.includes("spring")}
                <li><img width="24" height="16" src="./images/spring.png" alt="Spring" /> Spring</li>
              {/if}
              {#if item.seasons.includes("summer")}
                <li><img width="24" height="16" src="./images/summer.png" alt="Summer" /> Summer</li>
              {/if}
              {#if item.seasons.includes("fall")}
                <li><img width="24" height="16" src="./images/fall.png" alt="Fall" /> Fall</li>
              {/if}
              {#if item.seasons.includes("winter")}
                <li><img width="24" height="16" src="./images/winter.png" alt="Winter" /> Winter</li>
              {/if}
            </ul>
          </div>
        {/if}

        {#if typeof item.sources !== "undefined" || typeof item.monsterDrops !== "undefined" || typeof item.artifactSpots !== "undefined"}
          <div class="mdc-card section">
            {#if typeof item.sources !== "undefined" || typeof item.monsterDrops !== "undefined"}
              <h2 class="mdc-typography--subtitle2">Sources</h2>
              <ul class="mdc-typography--body2">
                {#if typeof item.sources !== "undefined"}
                  {#each item.sources as source}
                    <li>{source}</li>
                  {/each}
                {/if}
                {#if typeof item.monsterDrops !== "undefined"}
                  {#each Object.entries(item.monsterDrops) as [monster, probability]}
                    <li>{monster} ({calcProbability(probability)}%)</li>
                  {/each}
                {/if}
              </ul>
            {/if}

            {#if typeof item.artifactSpots !== "undefined"}
              <h2 class="mdc-typography--subtitle2">Artifact Spots</h2>
              <ul class="mdc-typography--body2">
                {#each Object.entries(item.artifactSpots) as [location, probability]}
                  <li>
                    {locationNames.get(location)}
                    ({calcProbability(probability)}%)
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/if}

        {#if typeof item.ingredients !== "undefined"}
          <div class="mdc-card section">
            <h2 class="mdc-typography--subtitle2">Ingredients</h2>
            <ul class="mdc-typography--body2">
              {#each Object.entries(item.ingredients) as [id, quantity]}
                <li>
                  {categories.get(id) || gameInfo.items[id].name}
                  {#if quantity > 1}× {quantity}{/if}
                </li>
              {/each}
            </ul>

            {#if typeof item.recipeSources !== "undefined"}
              <h2 class="mdc-typography--subtitle2">Recipe Sources</h2>
              <ul class="mdc-typography--body2">
                {#each item.recipeSources as source}
                  <li>{source}</li>
                {/each}
              </ul>
            {/if}
          </div>
        {/if}

        {#if typeof item.locations !== "undefined"}
          <div class="mdc-card section">
            <h2 class="mdc-typography--subtitle2">Found in</h2>
            <ul class="mdc-typography--body2">
              {#each item.locations as location}
                <li>{location}</li>
              {/each}
            </ul>
            {#if typeof item.time !== "undefined" && item.time !== "6AM – 2AM"}
              <p class="mdc-typography--body2">{item.time}</p>
            {/if}
            {#if typeof item.weather !== "undefined" && item.weather !== "both"}
              <p class="mdc-typography--body2">
                <img
                  src="./images/{item.weather}.png"
                  alt={weatherNames.get(item.weather)}
                />
                {weatherNames.get(item.weather)}
              </p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="mdc-dialog__scrim" />
</div>

<style lang="scss">
  .mdc-dialog__title {
    padding-right: 0;
  }

  .header {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding-top: 8px;
    padding-right: 8px;

    mwc-icon-button {
      display: inline-block;
      vertical-align: middle;

      margin-left: auto;
    }

    img {
      display: inline-block;
      vertical-align: middle;

      image-rendering: crisp-edges;
      image-rendering: pixelated;

      margin-right: 8px;
    }

    span {
      margin-right: 8px;
    }
  }

  .content {
    display: grid;
    gap: 16px;
    grid-auto-columns: repeat(max(2), auto);

    .seasons {
      ul {
        list-style-type: none;

        img {
          position: relative;
          top: 3px;
          margin-right: 8px;

          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }
      }
    }

    .section {
      padding: 16px;

      h2 {
        margin: 0;

        &:not(:first-of-type) {
          margin-top: 8px;
        }
      }

      ul {
        color: black;

        margin: 0;
        padding: 0;
        list-style-position: inside;
      }

      p {
        color: black;

        margin: 0;
        padding: 0;

        img {
          position: relative;
          top: 3px;
          margin-right: 4px;

          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }
      }
    }
  }

  a {
    display: contents;
    color: inherit;
  }
</style>
