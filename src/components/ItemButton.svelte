<script lang="ts">
  import { getContext } from 'svelte';
  import type { Item } from '../game-info';

  export let item: Item;
  export let scale = 2;
  export let shadow: boolean = false;
  export let grey: boolean = false;

  let dialog = getContext('item-info-dialog');

  $: size = (item.isCraftable ? 32 : 16) * scale;
</script>

<style lang="scss">
  button {
    display: inline-block;
    background-color: transparent;
    border: none;
    outline: none;

    padding: 0;
    text-align: center;
    vertical-align: middle;

    width: var(--size);
    height: var(--size);

    img {
      display: inline-block;

      margin: auto;
      width: calc(16px * var(--scale));

      vertical-align: middle;

      image-rendering: crisp-edges;
      image-rendering: pixelated;

      transition: transform 0.1s ease;

      user-select: none;

      &.shadow {
        --drop-dist: calc(1px * var(--scale));
        filter: drop-shadow(
          calc(var(--drop-dist) * -1) var(--drop-dist) 0px rgba(0, 0, 0, 0.3)
        );
      }

      &.grey {
        filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.3)) saturate(0)
          brightness(0.7);
      }
    }

    &:hover img,
    &:focus img {
      $hover-scale: 52 / 48;
      transform: scale($hover-scale);

      &.grey.shadow {
        filter: drop-shadow(
          calc(var(--drop-dist) * -1) var(--drop-dist) 0px rgba(0, 0, 0, 0.3)
        );
      }
    }
  }
</style>

<button
  style="--size: {size}px"
  on:click={() => {
    dialog.open(item);
  }}>
  <img
    src={item.imgData}
    alt={item.name}
    style="--scale: {scale}"
    class:grey
    class:shadow />
</button>
