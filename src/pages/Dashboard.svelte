<script lang="ts">
  import "@material/card/dist/mdc.card.min.css";
  import "@material/data-table/dist/mdc.data-table.min.css";
  import "@material/typography/dist/mdc.typography.min.css";
  import type { Readable } from "svelte/store";
  import { derived } from "svelte/store";
  import type { Item, Recipe } from "../game-info";
  import gameInfo from "../game-info";
  import ItemButton from "../ItemButton.svelte";
  import { seasonNames } from "../names";
  import type { SaveGame } from "../save";
  import save from "../save";

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

      const recipes: Record<string, number> = {};

      const processRecipe = (recipe: Recipe) => {
        for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
          const recipe = Object.values(gameInfo.recipes).find(
            (recipe) => recipe.result.id === ingredient
          );
          if (recipe) {
            recipes[recipe.name] ??= 0;
            // If a recipe makes two of an item, you only need to craft it once to satisfy the need for two of the item.
            recipes[recipe.name] += amount / recipe.amount;
            processRecipe(recipe);
          }
        }
      };

      const rootRecipes = Object.values(gameInfo.recipes).filter(
        (recipe) => !$save.collectedItems.includes(recipe.result.id)
      );

      // Figure out all the recipes needed to craft other recipes
      for (const recipe of rootRecipes) {
        processRecipe(recipe);
      }

      // You can't make half a recipe
      for (const recipe in recipes) {
        recipes[recipe] = Math.ceil(recipes[recipe]);
      }

      // Only if you won't be making the recipe anyway should the root recipes be added
      for (const recipe of rootRecipes) {
        recipes[recipe.name] ??= 1;
      }

      for (const [name, recipeAmount] of Object.entries(recipes)) {
        const recipe = gameInfo.recipes[name];
        for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
          if (
            Object.values(gameInfo.recipes).some(
              (recipe) => recipe.result.id === ingredient
            )
          ) {
            continue;
          }
          output[ingredient] ??= 0;
          output[ingredient] += amount * recipeAmount;
        }
      }

      for (const { id } of gameInfo.shipping) {
        if (!$save.collectedItems.includes(id)) {
          output[id] ??= 0;
          output[id] += 1;
        }
      }

      for (const { id } of gameInfo.fish) {
        if (!$save.collectedItems.includes(id)) {
          output[id] ??= 1;
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
    <div class="mdc-data-table">
      <div class="mdc-data-table__table-container">
        <table class="mdc-data-table__table">
          <thead>
            <tr class="mdc-data-table__header-row">
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col">
                Villager
              </th>
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col">
                Hearts
              </th>
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col">
                Birthday
              </th>
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col">
                Best Gifts
              </th>
            </tr>
          </thead>
          <tbody class="mdc-data-table__content">
            {#each $birthdays as birthday}
              <tr class="mdc-data-table__row">
                <th class="mdc-data-table__cell" scope="row">
                  {birthday.villager}
                </th>
                <td class="mdc-data-table__cell">
                  <div class="hearts">
                    {#each [...Array(birthday.maxHearts).keys()] as i}
                      <img
                        alt="heart"
                        src="./images/heart-{birthday.hearts >= i + 1 ? 'filled' : 'outline'}.png" />
                    {/each}
                  </div>
                </td>
                <td class="mdc-data-table__cell">{birthday.date}</td>
                <td class="mdc-data-table__cell">
                  <div class="best-gifts">
                    {#each birthday.bestGifts as item}
                      <ItemButton {item} scale={item.isCraftable ? 1 : 2} />
                    {/each}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
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
