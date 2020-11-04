<script context="module">
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
  import ItemButton from "../components/ItemButton.svelte";
  import type { GameInfo, Villager } from "../game-info";
  import save from "../save";
  import type { Relationship } from "../save";

  export let gameInfo: GameInfo;

  let villagers = derived<typeof save, (Villager & Relationship)[]>(
    save,
    ($save) =>
      Object.values(gameInfo.villagers)
        .map((villager) => ({
          ...villager,

          // These will be overriden by relationship, but will serve as backup if they haven't yet been met
          hearts: 0,
          maxHearts: villager.datable ? 8 : 10,
          giftsThisWeek: 0,

          ...$save?.relationships.get(villager.name),
        }))
        .sort((a, b) => a.hearts - b.hearts)
  );
</script>

<style lang="scss">
  @use "@material/typography/mdc-typography";

  h1 {
    margin: 20px 20px 0.5em;
  }

  :global(.friendship-table) {
    margin: 0px 24px 24px;
  }

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
</style>

<svelte:head>
  <title>Friendship | Stardew Completionist</title>
</svelte:head>

<h1 class="mdc-typography--headline4">Friendship</h1>
<DataTable class="friendship-table">
  <Head>
    <Row>
      <Cell>Villager</Cell>
      {#if $save !== null}
        <Cell>Hearts</Cell>
      {/if}
      <Cell>Birthday</Cell>
      <Cell>Best Gifts</Cell>
    </Row>
  </Head>
  <Body>
    {#each $villagers.filter((villager) => typeof villager.hearts === 'undefined' || villager.hearts < villager.maxHearts) as villager}
      <Row>
        <Cell>{villager.name}</Cell>
        {#if $save !== null}
          <Cell>
            <div class="hearts">
              {#each [...Array(villager.maxHearts).keys()] as i}
                <img
                  alt="heart"
                  src="heart-{villager.hearts >= i + 1 ? 'filled' : 'outline'}.png" />
              {/each}
            </div>
          </Cell>
        {/if}
        <Cell>{villager.birthday}</Cell>
        <Cell>
          <div class="best-gifts">
            {#each villager.bestGifts as item}
              <ItemButton {item} scale={item.isCraftable ? 1 : 2} />
            {/each}
          </div>
        </Cell>
      </Row>
    {/each}
  </Body>
</DataTable>
