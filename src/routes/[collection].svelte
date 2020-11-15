<script context="module" lang="ts">
  import _gameInfo from "../game-info";
  import { categoryNames } from "../names";

  export async function preload(page: {
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
  }) {
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

    const gameInfo = await _gameInfo.fetch(this.fetch);

    if (
      page.params.collection === "cooking" ||
      page.params.collection === "crafting"
    ) {
      return {
        gameInfo,
        title: categoryNames.get(page.params.collection),
        recipes: gameInfo[page.params.collection],
        items: gameInfo[page.params.collection].map((recipe) => recipe.result),
      };
    } else {
      return {
        gameInfo,
        title: categoryNames.get(page.params.collection),
        items: gameInfo[page.params.collection],
        recipes: undefined,
      };
    }
  }
</script>

<script lang="ts">
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import ItemButton from "../components/ItemButton.svelte";
  import type { Item, Recipe, GameInfo } from "../game-info";
  import save from "../save";
  import { derived } from "svelte/store";
  import { categories } from "../names";

  export let gameInfo: GameInfo;
  export let title: string;
  export let items: Item[];
  export let recipes: Recipe[] | undefined;

  const requiredIngredients = derived(save, ($save) => {
    if (!recipes || $save === null) {
      return null;
    } else {
      const processRecipe = (acc: Record<string, number>, recipe: Recipe) => {
        if (!$save.collectedItems.includes(recipe.result.id)) {
          for (const [ingredient, amount] of Object.entries(
            recipe.ingredients
          )) {
            if (ingredient in gameInfo.recipes) {
              acc = processRecipe(acc, gameInfo.recipes[ingredient]);
            } else {
              acc[ingredient] ??= 0;
              acc[ingredient] += amount;
            }
          }
        }

        return acc;
      };

      return recipes.reduce(processRecipe, {});
    }
  });
</script>

<style lang="scss">
  @use "@material/card";
  @use "@material/typography/mdc-typography";

  @include card.core-styles;

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

<svelte:head>
  <title>{title} | Stardew Completionist</title>
</svelte:head>

<div
  class="container"
  class:has-unknown-recipes={typeof recipes !== 'undefined' && $save !== null}>
  <div class="mdc-card mdc-card--outlined grid-card">
    <h2 class="mdc-typography--headline6">{title}</h2>
    <div class="item-grid">
      {#each items as item}
        <ItemButton
          {item}
          scale={item.isCraftable ? 2 : 3}
          shadow
          grey={$save === null ? false : !$save.collectedItems.includes(item.id)} />
      {/each}
    </div>
  </div>

  {#if typeof recipes !== 'undefined' && $save !== null}
    <DataTable style="grid-area: r">
      <Head>
        <Row>
          <Cell>Recipe</Cell>
          <Cell>Sources</Cell>
        </Row>
      </Head>
      <Body>
        {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}
          <Row>
            <Cell>
              <ItemButton
                item={recipe.result}
                scale={recipe.result.isCraftable ? 1 : 2} />
              <span style="padding-left: 8px">{recipe.name}</span>
            </Cell>
            <Cell>
              {#if typeof recipe.sources !== 'undefined'}
                <ul class="source-list">
                  {#each recipe.sources as source}
                    <li>{source}</li>
                  {/each}
                </ul>
              {/if}
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
    <div class="mdc-card mdc-card--outlined ingredients">
      <h2 class="mdc-typography--headline6">Required Ingredients</h2>
      <ul>
        {#each Object.entries($requiredIngredients) as [id, amount]}
          <li>{categories.get(id) || gameInfo.items[id].name}: {$save.items[id] ?? 0}/{amount}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
