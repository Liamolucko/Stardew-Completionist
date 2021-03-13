<script lang="ts">
  import { getContext } from "svelte";
  import type { Item } from "../game-info.js";
  import { qualityNames } from "../names";
  import { stores } from "@sapper/app";

  export let item: Item;
  export let scale = 2;
  export let shadow: boolean = false;
  export let grey: boolean = false;
  export let quality = 0;
  export let quantity = 1;

  let dialog = getContext<{ open(item: Item): void }>("item-info-dialog");

  const { page } = stores();
  // Set to false for a brief instant when the page changes to stop CSS transitions from activating.
  let transition = true;
  page.subscribe(() => {
    transition = false;
    setTimeout(() => (transition = true), 0);
  });

  $: size = (item.craftable ? 32 : 16) * scale;
</script>

<button
  style="--scale: {scale}; --size: {size}px"
  on:click={() => {
    dialog.open(item);
  }}
  class:transition
>
  <img
    class="sprite"
    src="data:image/png;base64,{item.sprite}"
    alt={item.name}
    width={16 * scale}
    height={size}
    class:greyed={grey}
    class:shadow
  />
  <img
    class="quality"
    width={6 * scale}
    height={6 * scale}
    src="./images/quality-{quality}.png"
    alt="{qualityNames.get(quality)} quality"
  />
  {#if quantity > 1}
    <div class="quantity">
      {#each quantity.toString() as char}
        <img
          width={3.5 * scale}
          height={4.9 * scale}
          src="./numbers/{char}.png"
          alt={char}
        />
      {/each}
    </div>
  {/if}
</button>

<style lang="scss">
  button {
    position: relative; // Make `position: absolute` work for subsequent elements
    display: inline-block;
    background-color: transparent;
    border: none;
    outline: none;
    width: var(--size);
    height: var(--size);

    padding: 0;
    text-align: center;
    vertical-align: middle;

    &.transition,
    &:hover {
      transition: transform 0.1s ease, filter 0.1s ease;
    }

    img {
      image-rendering: crisp-edges;
      image-rendering: pixelated;

      user-select: none;

      &.sprite {
        display: inline-block;

        transition: inherit;

        margin: auto;

        vertical-align: middle;

        &.shadow {
          --drop-dist: calc(1px * var(--scale));
          filter: drop-shadow(
            calc(var(--drop-dist) * -1) var(--drop-dist) 0px rgba(0, 0, 0, 0.3)
          );
        }

        &.greyed {
          filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.3)) saturate(0)
            brightness(0.7);
        }
      }

      &.quality {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    .quantity {
      position: absolute;
      right: calc(-1px * var(--scale));
      bottom: calc(-1px * var(--scale));

      display: flex;
      flex-flow: row nowrap;
      gap: 1px;
    }

    &:hover,
    &:focus {
      $hover-scale: 52 / 48;
      transform: scale($hover-scale);

      img.sprite.greyed.shadow {
        filter: drop-shadow(
          calc(var(--drop-dist) * -1) var(--drop-dist) 0px rgba(0, 0, 0, 0.3)
        );
      }
    }
  }
</style>
