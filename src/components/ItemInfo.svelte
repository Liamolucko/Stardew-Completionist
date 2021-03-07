<script lang="ts">
  import { mdiLaunch } from "@mdi/js";
  import { Button, Card, Icon } from "svelte-materialify";
  import type { Item } from "../game-info.js";
  import gameInfo from "../game-info.js";
  import { categories, locationNames, weatherNames } from "../names";

  export let item: Item;

  function calcProbability(probability: number): number {
    return Math.round((probability + Number.EPSILON) * 10000000) / 100000;
  }
</script>

{#if typeof item !== "undefined"}
  <div class="header">
    <img
      class="dialog-icon"
      src="data:image/png;base64,{item.sprite}"
      alt={item.name}
      height={item.craftable ? 64 : 48}
    />
    {item.name}
    <a href={item.url}>
      <Button target="_blank" icon>
        <Icon path={mdiLaunch} />
      </Button>
    </a>
  </div>
  <div class="content">
    {#if typeof item.seasons !== "undefined"}
      <Card class="section seasons">
        <h2 class="text-subtitle-2">Seasons</h2>
        <ul class="text-body-2">
          {#if item.seasons.spring}
            <li>
              <img src="./images/spring.png" alt="Spring" />
              Spring
            </li>
          {/if}
          {#if item.seasons.summer}
            <li>
              <img src="./images/summer.png" alt="Summer" />
              Summer
            </li>
          {/if}
          {#if item.seasons.fall}
            <li>
              <img src="./images/fall.png" alt="Fall" />
              Fall
            </li>
          {/if}
          {#if item.seasons.winter}
            <li>
              <img src="./images/winter.png" alt="Winter" />
              Winter
            </li>
          {/if}
        </ul>
      </Card>
    {/if}

    {#if typeof item.sources !== "undefined" || typeof item.monsterDrops !== "undefined" || typeof item.artifactSpots !== "undefined"}
      <Card class="section">
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
      </Card>
    {/if}

    {#if typeof item.ingredients !== "undefined"}
      <Card class="section">
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
      </Card>
    {/if}

    {#if typeof item.locations !== "undefined"}
      <Card class="section">
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
              src="./images/{item.weather}.png"
              alt={weatherNames.get(item.weather)}
            />
            {weatherNames.get(item.weather)}
          </p>
        {/if}
      </Card>
    {/if}
  </div>
{/if}

<style lang="scss">

  .header {
    display: inline-flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 8px 0;

    a {
      display: inline-block;
      vertical-align: middle;

      margin-left: auto;
      color: inherit;
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

    :global {
      .section {
        padding: 16px;

        h2 {
          margin: 0;

          &:not(:first-of-type) {
            margin-top: 8px;
          }
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-position: inside;
        }

        p {
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
  }
</style>
