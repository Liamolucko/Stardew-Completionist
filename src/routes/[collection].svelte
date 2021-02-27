<script context="module" lang="ts">
  import gameInfo from "$components/game-info";
  import { categoryNames } from "$components/names";

  export async function preload(
    this: { error: (status: number, error: string | Error) => void },
    page: {
      host: string;
      path: string;
      params: {
        collection:
          | "shipping"
          | "fish"
          | "artifacts"
          | "minerals"
          | "cooking"
          | "crafting";
      };
      query: Record<string, string | boolean>;
    }
  ) {
    if (
      ![
        "shipping",
        "fish",
        "artifacts",
        "minerals",
        "cooking",
        "crafting",
      ].includes(page.params.collection)
    ) {
      return this.error(404, "Not found");
    }

    if (
      page.params.collection === "cooking" ||
      page.params.collection === "crafting"
    ) {
      return {
        title: categoryNames.get(page.params.collection),
        recipes: gameInfo[page.params.collection],
        items: gameInfo[page.params.collection].map((recipe) => recipe.result),
      };
    } else {
      return {
        title: categoryNames.get(page.params.collection),
        items: gameInfo[page.params.collection],
        recipes: undefined,
      };
    }
  }
</script>

<script lang="ts">
  import ItemButton from "$components/ItemButton.svelte";
  import type { Item, Recipe } from "$components/game-info";
  import save from "$components/save";
  import { derived } from "svelte/store";
  import { categories } from "$components/names";
  import { getStores } from "$app/stores";

  export let title: string;
  export let items: Item[];
  export let recipes: Recipe[] | undefined;

  const requiredIngredients = derived([save, getStores().page], ([$save]) => {
    if (!recipes || $save === null) {
      return null;
    } else {
      const recipesNeeded: Record<string, number> = {};

      const processRecipe = (recipe: Recipe) => {
        for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
          const recipe = Object.values(gameInfo.recipes).find(
            (recipe) => recipe.result.id === ingredient
          );
          if (recipe) {
            recipesNeeded[recipe.name] ??= 0;
            // If a recipe makes two of an item, you only need to craft it once to satisfy the need for two of the item.
            recipesNeeded[recipe.name] += amount / recipe.amount;
            processRecipe(recipe);
          }
        }
      };

      const rootRecipes = recipes.filter(
        (recipe) => !$save.collectedItems.includes(recipe.result.id)
      );

      // Figure out all the recipes needed to craft other recipes
      for (const recipe of rootRecipes) {
        processRecipe(recipe);
      }

      // You can't make half a recipe
      for (const recipe in recipesNeeded) {
        recipesNeeded[recipe] = Math.ceil(recipesNeeded[recipe]);
      }

      // Only if you won't be making the recipe anyway should the root recipes be added
      for (const recipe of rootRecipes) {
        recipesNeeded[recipe.name] ??= 1;
      }

      const output: Record<string, number> = {};

      for (const [name, recipeAmount] of Object.entries(recipesNeeded)) {
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

      return output;
    }
  });
</script>

<svelte:head>
  <title>{title} | Stardew Completionist</title>
</svelte:head>

<div
  class="container"
  class:has-unknown-recipes={typeof recipes !== "undefined" && $save !== null}
>
  <div class="mdc-card mdc-card--outlined grid-card">
    <h2 class="text-h6">{title}</h2>
    <div class="item-grid">
      {#each items as item}
        <ItemButton
          {item}
          scale={item.isCraftable ? 2 : 3}
          shadow
          grey={$save === null
            ? false
            : !$save.collectedItems.includes(item.id)}
        />
      {/each}
    </div>
  </div>

  {#if typeof recipes !== "undefined" && $save !== null}
    <div class="mdc-data-table">
      <div class="mdc-data-table__table-container">
        <table class="mdc-data-table__table">
          <thead>
            <tr class="mdc-data-table__header-row">
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col"
              >
                Recipe
              </th>
              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col"
              >
                Sources
              </th>
            </tr>
          </thead>
          <tbody class="mdc-data-table__content">
            {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}
              <tr class="mdc-data-table__row">
                <th class="mdc-data-table__cell" scope="row">
                  <ItemButton
                    item={recipe.result}
                    scale={recipe.result.isCraftable ? 1 : 2}
                  />
                  <span style="padding-left: 8px">{recipe.name}</span>
                </th>
                <td class="mdc-data-table__cell">
                  {#if recipe.sources != null}
                    <ul class="source-list">
                      {#each recipe.sources as source}
                        <li>{source}</li>
                      {/each}
                    </ul>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="mdc-card mdc-card--outlined ingredients">
      <h2 class="text-h6">Required Ingredients</h2>
      <ul>
        {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}
          <li>
            {categories.get(id) || gameInfo.items[id].name}:
            {$save.items[id] ?? 0}/{amount}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "@material/card/dist/mdc.card.min.css";
  @import "@material/data-table/dist/mdc.data-table.min.css";

  .container {
    display: grid;

    padding: 20px;

    gap: 24px;
    grid-template-areas:
      "g"
      "r"
      "i";

    overflow: auto;

    @media only screen and (min-width: 1425px) {
      &.has-unknown-recipes {
        grid-template-areas:
          "g r"
          "i r";
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
      }
    }

    width: 100%;

    justify-content: center;

    .mdc-card {
      padding: 16px;
    }

    .grid-card {
      width: max-content;
      height: max-content;

      grid-area: g;

      .item-grid {
        display: grid;
        gap: 8px;
        grid-auto-flow: row;
        grid-auto-rows: 64px;
        grid-template-columns: repeat(10, 64px);

        justify-content: center;

        & > :global(button) {
          width: 100%;
          height: 100%;
        }
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-position: inside;
    }

    .ingredients {
      height: max-content;
    }
  }
</style>
