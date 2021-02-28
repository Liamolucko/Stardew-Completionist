import _json from "./game-info.json";
import type { RawGameInfo } from "./game-info-types";
export type {
  Bundle,
  GameInfo,
  Item,
  Recipe,
  Villager,
} from "./game-info-types";

const json: RawGameInfo = _json;

const recipes = Object.fromEntries(
  Object.entries(json.recipes)
    .map(([name, recipe]) => [name, {
      ...recipe,
      result: json.items[recipe.result],
    }]),
);

export default {
  items: json.items,
  recipes,
  shipping: json.shipping.map((id) => json.items[id]),
  fish: json.fish.map((id) => json.items[id]),
  artifacts: json.artifacts.map((id) => json.items[id]),
  minerals: json.minerals.map((id) => json.items[id]),
  cooking: json.cooking.map((name) => recipes[name]),
  crafting: json.crafting.map((name) => recipes[name]),
  bundles: json.bundles,
  villagers: Object.fromEntries(
    Object.entries(json.villagers)
      .map(([name, villager]) => [name, {
        ...villager,
        bestGifts: villager.bestGifts.map((id) => json.items[id]),
      }]),
  ),
};
