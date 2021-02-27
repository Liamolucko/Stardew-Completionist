<script lang="ts">
  import gameInfo from "./game-info";
  import type { Item } from "./game-info";
  import { categories, locationNames, weatherNames } from "./names";
  import { Button, Icon } from "svelte-materialify";
  import { mdiLaunch } from "@mdi/js";

  export let item: Item;

  function calcProbability(probability: number): number {
    return Math.round((probability + Number.EPSILON) * 10000000) / 100000;
  }
</script>

{#if typeof item !== "undefined"}
  <div class="mdc-dialog__title">
    <div class="header">
      <img
        class="dialog-icon"
        src="data:image/png;base64,{item.sprite}"
        alt={item.name}
        height={item.isCraftable ? 64 : 48}
      />
      {item.name}
      <Button href={item.url} target="_blank" icon>
        <Icon path={mdiLaunch} />
      </Button>
    </div>
  </div>
  <div class="mdc-dialog__content content">
    {#if typeof item.seasons !== "undefined"}
      <div class="mdc-card section section seasons">
        <h2 class="text-subtitle-2">Seasons</h2>
        <ul class="text-body-2">
          {#if item.seasons.includes("spring")}
            <li>
              <img src="spring.png" alt="Spring" />
              Spring
            </li>
          {/if}
          {#if item.seasons.includes("summer")}
            <li>
              <img src="summer.png" alt="Summer" />
              Summer
            </li>
          {/if}
          {#if item.seasons.includes("fall")}
            <li>
              <img src="fall.png" alt="Fall" />
              Fall
            </li>
          {/if}
          {#if item.seasons.includes("winter")}
            <li>
              <img src="winter.png" alt="Winter" />
              Winter
            </li>
          {/if}
        </ul>
      </div>
    {/if}

    {#if typeof item.sources !== "undefined" || typeof item.monsterDrops !== "undefined" || typeof item.artifactSpots !== "undefined"}
      <div class="mdc-card section">
        {#if typeof item.sources !== "undefined" || typeof item.monsterDrops !== "undefined"}
          <h2 class="text-subtitle-2">Sources</h2>
          <ul class="text-body-2">
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
          <h2 class="text-subtitle-2">Artifact Spots</h2>
          <ul class="text-body-2">
            {#each Object.entries(item.artifactSpots) as [location, probability]}
              <li>
                {locationNames.get(location)} ({calcProbability(probability)}%)
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if typeof item.ingredients !== "undefined"}
      <div class="mdc-card section">
        <h2 class="text-subtitle-2">Ingredients</h2>
        <ul class="text-body-2">
          {#each Object.entries(item.ingredients) as [id, quantity]}
            <li>
              {categories.get(id) || gameInfo.items[id].name}
              {#if quantity > 1}× {quantity}{/if}
            </li>
          {/each}
        </ul>

        {#if typeof item.recipeSources !== "undefined"}
          <h2 class="text-subtitle-2">Recipe Sources</h2>
          <ul class="text-body-2">
            {#each item.recipeSources as source}
              <li>{source}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if typeof item.locations !== "undefined"}
      <div class="mdc-card section">
        <h2 class="text-subtitle-2">Found in</h2>
        <ul class="text-body-2">
          {#each item.locations as location}
            <li>{location}</li>
          {/each}
        </ul>
        {#if typeof item.time !== "undefined" && item.time !== "6AM – 2AM"}
          <p class="text-body-2">{item.time}</p>
        {/if}
        {#if typeof item.weather !== "undefined" && item.weather !== "both"}
          <p class="text-body-2">
            <img
              src="{item.weather}.png"
              alt={weatherNames.get(item.weather)}
            />
            {weatherNames.get(item.weather)}
          </p>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "@material/card/dist/mdc.card.min.css";

  .mdc-dialog__title {
    padding-right: 0;
  }

  .header {
    display: inline-flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 8px 8px 8px 0;

    :global(:last-child) {
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
</style>
