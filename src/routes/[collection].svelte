<script context="module" lang="ts">
  import { stores } from "@sapper/app";
  import { Card } from "svelte-materialify";
  import Table from "svelte-materialify/dist/components/Table";
  import { derived } from "svelte/store";
  import ItemButton from "../components/ItemButton.svelte";
  import type { Item, Recipe } from "../game-info.js";
  import gameInfo from "../game-info.js";
  import { categories, categoryNames } from "../names";
  import save from "../save";

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
  export let title: string;
  export let items: Item[];
  export let recipes: Recipe[] | undefined;

  const requiredIngredients = derived([save, stores().page], ([$save]) => {
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
        (recipe) => !$save.collected.includes(recipe.result.id)
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
  <Card outlined class="pa-4 grid-card">
    <h6>{title}</h6>
    <div class="item-grid">
      {#each items as item}
        <ItemButton
          {item}
          scale={item.craftable ? 2 : 3}
          shadow
          grey={$save === null ? false : !$save.collected.includes(item.id)}
        />
      {/each}
    </div>
  </Card>

  {#if typeof recipes !== "undefined" && $save !== null}
    <Card outlined style="grid-area: r">
      <h6 class="pl-4 pt-4 pr-4">Unknown Recipes</h6>
      <Table>
        <thead>
          <tr>
            <th role="columnheader" scope="col">Recipe</th>
            <th role="columnheader" scope="col">Sources</th>
          </tr>
        </thead>
        <tbody>
          {#each recipes.filter((recipe) => $save && !$save.recipes.includes(recipe.name)) as recipe}
            <tr>
              <td>
                <ItemButton
                  item={recipe.result}
                  scale={recipe.result.craftable ? 1 : 2}
                />
                <span class="pa-3">{recipe.name}</span>
              </td>
              <td>
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
      </Table>
    </Card>
    <Card outlined class="pa-4 ingredients">
      <h6>Required Ingredients</h6>
      <ul>
        {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}
          <li>
            {categories.get(id) || gameInfo.items[id].name}:
            {$save.items[id] ?? 0}/{amount}
          </li>
        {/each}
      </ul>
    </Card>
  {/if}
</div>

<style lang="scss">
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

    :global {
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
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-position: inside;
    }

    :global {
      .ingredients {
        height: max-content;
        grid-area: i;
      }
    }
  }
</style>
