<script lang="ts">
  import { derived } from "svelte/store";
  import ItemButton from "../components/ItemButton.svelte";
  import type { Villager } from "../game-info.js";
  import gameInfo from "../game-info.js";
  import type { Relationship } from "../save";
  import save from "../save";
  import { Card } from "svelte-materialify";
  import Table from "svelte-materialify/dist/components/Table";

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

<h4>Friendship</h4>
<Card outlined class="ml-6 mb-6 mr-6">
  <Table>
    <thead>
      <tr>
        <th role="columnheader" scope="col">
          Villager
        </th>
        {#if $save !== null}
          <th
          
            role="columnheader"
            scope="col"
          >
            Hearts
          </th>
        {/if}
        <th  role="columnheader" scope="col">
          Birthday
        </th>
        <th role="columnheader" scope="col">
          Best Gifts
        </th>
      </tr>
    </thead>
    <tbody>
      {#each $villagers.filter((villager) => typeof villager.hearts === "undefined" || villager.hearts < villager.maxHearts) as villager}
        <tr >
          <th  scope="row">{villager.name}</th>
          {#if $save !== null}
            <td >
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
          <td>{villager.birthday}</td>
          <td >
            <div class="best-gifts">
              {#each villager.bestGifts as item}
                <ItemButton {item} scale={item.isCraftable ? 1 : 2} />
              {/each}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>
</Card>

<style lang="scss">
  h4 {
    margin: 20px 20px 0.5em;
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
