<script lang="ts">
  import type { Readable } from "svelte/store";
  import ItemButton from "$components/ItemButton.svelte";
  import type { Bundle, Item } from "$components/game-info";
  import gameInfo from "$components/game-info";
  import { derived } from "svelte/store";
  import save from "$components/save";

  const sections: Readable<
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
  > = derived(save, ($save) =>
    gameInfo.bundles.reduce(
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
                  $save.bundleCompletion.has(bundle.id) &&
                  $save.bundleCompletion.get(bundle.id)?.[i],
              })),
            completedItems: bundle.items
              .filter(
                ({ id }, i) =>
                  ($save?.bundleCompletion.get(bundle.id)?.[i] ?? true) &&
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
    <h1>{name}</h1>
    <div class="section">
      {#each bundles as bundle}
        <div class="bundle mdc-card mdc-card--outlined">
          <h5 class="text-h6">{bundle.name}</h5>
          {#if bundle.gold > 0}
            {#if $save !== null && $save.bundleCompletion
                .get(bundle.id)
                .some((e) => e)}
              <div class="completed material-icons">check</div>
            {:else}
              <div class="not-completed material-icons">close</div>
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
              <div class="completed material-icons">check</div>
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
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  @import "@material/card/dist/mdc.card.min.css";

  .container {
    padding: 20px;

    h1 {
      margin: 0 0 0.25em;
    }

    .mdc-card {
      padding: 16px;

      h5 {
        display: inline-block;
        width: max-content;
      }
    }

    .section {
      display: flex;
      flex-flow: row wrap;
    }

    .bundle {
      display: flex;
      flex-flow: column nowrap;

      margin: 0 20px 20px 0;

      *:not(:last-child) {
        margin-bottom: 16px;
      }

      h5 {
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

          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background-color: #f6f6f6;

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

      .completed,
      .not-completed {
        text-align: center;
        font-size: 100px;

        user-select: none;

        &.completed {
          color: green;
        }

        &.not-completed {
          color: red;
        }
      }
    }
  }
</style>
