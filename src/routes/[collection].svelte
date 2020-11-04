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
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import ItemButton from "../components/ItemButton.svelte";
  import type { Item, Recipe } from "../game-info";
  import save from "../save";

  export let title: string;
  export let items: Item[];
  export let recipes: Recipe[] | undefined;
</script>

<style lang="scss">
  @use "@material/card";
  @use "@material/typography/mdc-typography";

  @include card.core-styles;

  .container {
    display: grid;

    padding: 20px;

    gap: 24px;
    grid-auto-flow: row;
    grid-template-areas:
      "g"
      "r";

    overflow: auto;

    @media only screen and (min-width: 1425px) {
      &.has-unknown-recipes {
        grid-template-areas: "g r";
        grid-template-columns: auto 1fr;
      }
    }

    width: 100%;

    justify-content: center;

    .grid-card {
      width: max-content;
      height: max-content;

      padding: 16px;

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

    .source-list {
      margin: 0;
      padding: 0;
      list-style-position: inside;
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
    <DataTable>
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
  {/if}
</div>
