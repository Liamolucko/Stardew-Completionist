<script lang="ts">
  import { mdiCheck, mdiClose } from "@mdi/js";
  import { Card, Icon } from "svelte-materialify";
  import { derived } from "svelte/store";
  import ItemButton from "../components/ItemButton.svelte";
  import type { Bundle, Item } from "../game-info.js";
  import gameInfo from "../game-info.js";
  import save from "../save";

  const sections = derived(save, ($save) =>
    gameInfo.bundles.reduce<
      Record<
        string,
        ({
          items: (Item & {
            amount: number;
            quality: number;
            completed: boolean;
          })[];
          completedItems: Item[];
        } & Bundle)[]
      >
    >(
      (acc, bundle) => ({
        ...acc,
        [bundle.section]: [
          ...(acc[bundle.section] ?? []),
          {
            ...bundle,
            items: bundle.items
              .filter((item) => item.id in gameInfo.items)
              .map((item, i) => ({
                ...item,
                ...gameInfo.items[item.id],
                completed:
                  $save !== null &&
                  bundle.id in $save.bundleCompletion &&
                  $save.bundleCompletion[bundle.id][i],
              })),
            completedItems: bundle.items
              .filter(
                ({ id }, i) =>
                  ($save?.bundleCompletion[bundle.id]?.[i] ?? true) &&
                  gameInfo.items[id]
              )
              .map(({ id }) => gameInfo.items[id]),
          },
        ],
      }),
      {}
    )
  );
</script>

<svelte:head>
  <title>Bundles | Stardew Completionist</title>
</svelte:head>

<div class="container">
  {#each Object.entries($sections) as [name, bundles]}
    <h4>{name}</h4>
    <div class="section">
      {#each bundles as bundle}
        <Card outlined class="bundle pa-4">
          <h6>{bundle.name}</h6>
          {#if bundle.gold > 0}
            {#if $save !== null && $save.bundleCompletion[bundle.id].some((e) => e)}
              <Icon path={mdiCheck} class="green-text" size="64px" />
            {:else}
              <Icon path={mdiClose} class="red-text" size="64px" />
            {/if}
          {:else}
            <div class="slots" style="--slots: {bundle.slots}">
              {#each [...Array(bundle.slots).keys()] as i}
                <span class="slot">
                  {#if $save !== null && bundle.completedItems.length > i}
                    <ItemButton scale={2} item={bundle.completedItems[i]} />
                  {/if}
                </span>
              {/each}
            </div>
            {#if $save !== null && bundle.items.every((item) => item.completed)}
              <Icon path={mdiCheck} class="green-text" size="64px" />
            {:else}
              <div class="options">
                {#each bundle.items.filter((item) => !item.completed) as item}
                  <ItemButton
                    {item}
                    scale={2}
                    quality={item.quality}
                    quantity={item.amount}
                  />
                {/each}
              </div>
            {/if}
          {/if}
        </Card>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    padding: 20px;

    h4 {
      margin: 0 0 0.25em;
    }

    .section {
      display: flex;
      flex-flow: row wrap;
    }
  }

  :global(.bundle) {
    display: flex;
    flex-flow: column nowrap;

    margin: 0 20px 20px 0;

    *:not(:last-child) {
      margin-bottom: 16px;
    }

    h6 {
      margin: 0;
    }

    .slots {
      display: grid;
      gap: 16px;
      grid-auto-flow: row;
      grid-auto-rows: 50px;
      grid-template-columns: repeat(var(--slots, auto-fit), 50px);
      justify-content: center;

      width: 100%;

      .slot {
        display: inline-block;

        border: 1px solid var(--theme-dividers);
        border-radius: 12px;
        background-color: var(--theme-surface);

        width: 50px;
        height: 50px;

        & > :global(*) {
          width: 100%;
          height: 100%;
        }
      }
    }

    .options {
      display: grid;
      gap: 16px;
      grid-auto-flow: row;
      grid-auto-rows: 32px;
      grid-template-columns: repeat(auto-fit, 32px);
      justify-content: center;
      align-content: center;

      width: 100%;

      flex-grow: 1;
    }
  }
</style>
