<script lang="ts">
  import { derived } from "svelte/store";
  import ItemButton from "$components/ItemButton.svelte";
  import type { Villager } from "$components/game-info";
  import save from "$components/save";
  import type { Relationship } from "$components/save";
  import gameInfo from "$components/game-info";

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

<svelte:head>
  <title>Friendship | Stardew Completionist</title>
</svelte:head>

<h1 class="text-h4">Friendship</h1>
<div class="mdc-data-table">
  <div class="mdc-data-table__table-container">
    <table class="mdc-data-table__table" aria-label="Dessert calories">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th
            class="mdc-data-table__header-cell"
            role="columnheader"
            scope="col"
          >
            Villager
          </th>
          {#if $save !== null}
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              Hearts
            </th>
          {/if}
          <th
            class="mdc-data-table__header-cell"
            role="columnheader"
            scope="col"
          >
            Birthday
          </th>
          <th
            class="mdc-data-table__header-cell"
            role="columnheader"
            scope="col"
          >
            Best Gifts
          </th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        {#each $villagers.filter((villager) => typeof villager.hearts === "undefined" || villager.hearts < villager.maxHearts) as villager}
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">{villager.name}</th>
            {#if $save !== null}
              <td class="mdc-data-table__cell">
                <div class="hearts">
                  {#each [...Array(villager.maxHearts).keys()] as i}
                    <img
                      alt="heart"
                      src="./images/heart-{villager.hearts >= i + 1
                        ? 'filled'
                        : 'outline'}.png"
                    />
                  {/each}
                </div>
              </td>
            {/if}
            <td class="mdc-data-table__cell">{villager.birthday}</td>
            <td class="mdc-data-table__cell">
              <div class="best-gifts">
                {#each villager.bestGifts as item}
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

<style lang="scss">
  @import "@material/data-table/dist/mdc.data-table.min.css";

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
