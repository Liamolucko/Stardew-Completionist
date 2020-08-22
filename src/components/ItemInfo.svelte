<script lang="ts">
  import IconButton from '@smui/icon-button';
  import gameInfo from '../game-info';
  import type { Item } from '../game-info';
  import { categories, locationNames, weatherNames } from '../names';

  export let item: Item;

  function calcProbability(probability: number): number {
    return Math.round((probability + Number.EPSILON) * 10000000) / 100000;
  }

  function formatTime(time: number) {
    const hour = ((time % 1200) + (time % 1200 === 0 ? 1200 : 0)).toString();
    const half = Math.floor(time / 1200) % 2 === 0 ? 'AM' : 'PM';

    return `${hour.slice(0, -2)}:${hour.slice(-2)}${half}`;
  }
</script>

<style lang="scss">
  @use '@material/typography/mixins' as typography;
  @use '@material/card/mdc-card';

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
        }
      }
    }

    .section {
      padding: 16px;

      h2 {
        margin: 0;

        @include typography.mdc-typography('subtitle2');

        &:not(:first-of-type) {
          margin-top: 8px;
        }
      }

      ul {
        @include typography.mdc-typography('body2');
        color: black;

        margin: 0;
        padding: 0;
        list-style-position: inside;
      }

      p {
        @include typography.mdc-typography('body2');
        color: black;

        margin: 0;
        padding: 0;

        img {
          position: relative;
          top: 3px;
          margin-right: 4px;
        }
      }
    }
  }
</style>

{#if typeof item !== 'undefined'}
  <div class="mdc-dialog__title">
    <div class="header">
      <img
        class="dialog-icon"
        src={item.imgData}
        alt={item.name}
        height={item.isCraftable ? 64 : 48} />
      {item.name}
      <IconButton class="material-icons" href={item.url} target="_blank">
        launch
      </IconButton>
    </div>
  </div>
  <div class="mdc-dialog__content content">
    {#if typeof item.seasons !== 'undefined'}
      <div class="mdc-card section section seasons">
        <h2>Seasons</h2>
        <ul>
          {#if item.seasons.spring}
            <li>
              <img src="spring.png" alt="Spring" />
              Spring
            </li>
          {/if}
          {#if item.seasons.summer}
            <li>
              <img src="summer.png" alt="Summer" />
              Summer
            </li>
          {/if}
          {#if item.seasons.fall}
            <li>
              <img src="fall.png" alt="Fall" />
              Fall
            </li>
          {/if}
          {#if item.seasons.winter}
            <li>
              <img src="winter.png" alt="Winter" />
              Winter
            </li>
          {/if}
        </ul>
      </div>
    {/if}

    {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined' || typeof item.artifactSpots !== 'undefined'}
      <div class="mdc-card section">
        {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined'}
          <h2>Sources</h2>
          <ul>
            {#if typeof item.sources !== 'undefined'}
              {#each item.sources as source}
                <li>{source}</li>
              {/each}
            {/if}
            {#if typeof item.monsterDrops !== 'undefined'}
              {#each Object.entries(item.monsterDrops) as [monster, probability]}
                <li>{monster} ({calcProbability(probability)}%)</li>
              {/each}
            {/if}
          </ul>
        {/if}

        {#if typeof item.artifactSpots !== 'undefined'}
          <h2>Artifact Spots</h2>
          <ul>
            {#each Object.entries(item.artifactSpots) as [location, probability]}
              <li>
                {locationNames.get(location)} ({calcProbability(probability)}%)
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if typeof item.ingredients !== 'undefined'}
      <div class="mdc-card section">
        <h2>Ingredients</h2>
        <ul>
          {#each Object.entries(item.ingredients) as [id, quantity]}
            <li>
              {categories.get(id) || gameInfo.items.get(id).name}
              {#if quantity > 1}× {quantity}{/if}
            </li>
          {/each}
        </ul>

        {#if typeof item.recipeSources !== 'undefined'}
          <h2>Recipe Sources</h2>
          <ul>
            {#each item.recipeSources as source}
              <li>{source}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if typeof item.locations !== 'undefined'}
      <div class="mdc-card section">
        <h2>Found in</h2>
        <ul>
          {#each item.locations as location}
            <li>{location}</li>
          {/each}
        </ul>
        {#if typeof item.time !== 'undefined' && !(item.time[0] === 600 && item.time[1] === 2600)}
          <p>{formatTime(item.time[0])} – {formatTime(item.time[1])}</p>
        {/if}
        {#if typeof item.weather !== 'undefined' && item.weather !== 'both'}
          <p>
            <img
              src="{item.weather}.png"
              alt={weatherNames.get(item.weather)} />
            {weatherNames.get(item.weather)}
          </p>
        {/if}
      </div>
    {/if}
  </div>
{/if}
