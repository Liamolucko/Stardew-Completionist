<script context="module" lang="ts">
  import gameInfo from "../game-info";

  export async function preload() {
    return {
      gameInfo: await gameInfo.fetch(this.fetch),
    };
  }
</script>

<script lang="ts">
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import { derived } from "svelte/store";
  import type { Readable } from "svelte/store";
  import ItemButton from "../components/ItemButton.svelte";
  import type { GameInfo, Item, Recipe } from "../game-info";
  import { seasonNames } from "../names";
  import save from "../save";
  import type { SaveGame } from "../save";

  export let gameInfo: GameInfo;

  interface Birthday {
    villager: string;
    hearts: number;
    maxHearts: number;
    date: string;
    bestGifts: Item[];
  }

  const birthdays = derived<typeof save, Birthday[]>(
    save,
    ($save: SaveGame | null, set: (value: Birthday[]) => void) => {
      if ($save !== null) {
        set(
          Object.values(gameInfo.villagers)
            .sort(
              (a, b) =>
                ((a.birthDate - $save.currentDate + 112) % 112) -
                ((b.birthDate - $save.currentDate + 112) % 112)
            )
            .map((villager) => ({
              villager: villager.name,
              date: villager.birthday,
              hearts: $save.relationships.get(villager.name)?.hearts ?? 0,
              maxHearts:
                $save.relationships.get(villager.name)?.maxHearts ??
                (villager.datable ? 8 : 10),
              bestGifts: villager.bestGifts,
            }))
        );
      }
    }
  );

  const requiredItems = derived(save, ($save) => {
    if ($save === null) {
      return null;
    } else {
      const output: Record<string, number> = {};

      const processRecipe = (recipe: Recipe) => {
        if (!$save.collectedItems.includes(recipe.result.id)) {
          for (const [ingredient, amount] of Object.entries(
            recipe.ingredients
          )) {
            if (ingredient in gameInfo.recipes) {
              processRecipe(gameInfo.recipes[ingredient]);
            } else {
              output[ingredient] ??= 0;
              output[ingredient] += amount;
            }
          }
        }
      };

      for (const recipe of Object.values(gameInfo.recipes)) {
        processRecipe(recipe);
      }

      for (const { id } of [...gameInfo.shipping, ...gameInfo.fish]) {
        if (!$save.collectedItems.includes(id)) {
          output[id] ??= 0;
          output[id] += 1;
        }
      }

      for (const bundle of Object.values(gameInfo.bundles)) {
        for (const [index, item] of Object.entries(bundle.items)) {
          if (!$save.bundleCompletion.get(bundle.id)![index]) {
            output[item.id] ??= 0;
            output[item.id] += item.amount;
          }
        }
      }

      for (const id in output) {
        output[id] -= $save.items[id] ?? 0;
        if (output[id] <= 0) delete output[id];
      }

      return output;
    }
  });

  const seasonalItems: Readable<Record<string, number>> = derived(
    requiredItems,
    ($requiredItems, set) => {
      if ($requiredItems !== null) {
        set(
          Object.fromEntries(
            Object.entries($requiredItems).filter(([id, _]) => {
              const item = gameInfo.items[id];
              return (
                item &&
                typeof item.seasons !== "undefined" &&
                item.seasons.includes(
                  ["spring", "summer", "fall", "winter"][$save!.currentSeason]
                ) &&
                Object.values(item.seasons).filter((value) => value).length < 3
              );
            })
          )
        );
      }
    }
  );
</script>

<style lang="scss">
  @use "@material/card";
  @use "@material/typography/mdc-typography";

  @include card.core-styles;

  .best-gifts {
    display: flex;
    flex-direction: row;

    :global(button:not(:last-of-type)) {
      margin-right: 8px;
    }
  }

  .hearts {
    display: flex;
    flex-direction: row;

    img {
      user-select: none;

      &:not(:last-of-type) {
        margin-right: 2px;
      }
    }
  }

  .title {
    margin: 20px 20px 0.5em;
  }

  .container {
    display: grid;
    gap: 24px;
    grid-template-areas:
      "b"
      "s";

    @media only screen and (min-width: 1250px) {
      grid-template-areas: "b s";
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-rows: min-content;
    }

    padding: 0 20px 20px;
  }

  .seasonal {
    display: flex;
    flex-flow: column nowrap;

    grid-area: s;

    padding: 16px;

    .seasonal-items {
      display: grid;
      grid-auto-flow: row;
      grid-auto-rows: 64px;
      grid-template-columns: repeat(auto-fill, 64px);
      gap: 8px;

      flex-grow: 1;

      @media only screen and (min-width: 1250px) {
        grid-template-columns: repeat(2, 64px);
      }
    }
  }

  .no-save {
    margin: 0px 20px;
  }
</style>

<svelte:head>
  <title>Dashboard | Stardew Completionist</title>
</svelte:head>

<h1 class="title mdc-typography--headline4">Dashboard</h1>
{#if $save !== null}
  <div class="container">
    <DataTable>
      <Head>
        <Row>
          <Cell>Villager</Cell>
          <Cell>Hearts</Cell>
          <Cell>Birthday</Cell>
          <Cell>Best Gifts</Cell>
        </Row>
      </Head>
      <Body>
        {#each $birthdays as birthday}
          <Row>
            <Cell>{birthday.villager}</Cell>
            <Cell>
              <div class="hearts">
                {#each [...Array(birthday.maxHearts).keys()] as i}
                  <img
                    alt="heart"
                    src="heart-{birthday.hearts >= i + 1 ? 'filled' : 'outline'}.png" />
                {/each}
              </div>
            </Cell>
            <Cell>{birthday.date}</Cell>
            <Cell>
              <div class="best-gifts">
                {#each birthday.bestGifts as item}
                  <ItemButton {item} scale={item.isCraftable ? 1 : 2} />
                {/each}
              </div>
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
    <div class="mdc-card mdc-card--outlined seasonal">
      <h2 class="mdc-typography--headline6">
        {seasonNames.get($save.currentSeason)}
      </h2>
      <div class="seasonal-items">
        {#each Object.entries($seasonalItems) as [id, quantity]}
          <ItemButton
            item={gameInfo.items[id]}
            scale={gameInfo.items[id].isCraftable ? 2 : 3}
            {quantity} />
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p class="no-save">
    When you select a save file, this section shows information about what you
    should do next.
  </p>
{/if}
