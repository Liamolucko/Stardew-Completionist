// Structure of actual json file
export interface RawGameInfo {
  shipping: string[];
  fish: string[];
  artifacts: string[];
  minerals: string[];
  cooking: string[];
  crafting: string[];
  bundles: Bundle[];
  villagers: Record<string, RawVillager>;
  items: Record<string, Item>;
  recipes: Record<string, RawRecipe>;
}

export interface RawRecipe {
  name: string;
  ingredients: Record<string, number>;
  result: string;
  amount: number;
  sources?: string[];
}

export interface RawVillager {
  name: string;
  datable: boolean;
  bestGifts: string[];
  birthday: string;
  birthDate: number;
}

export interface GameInfo {
  shipping: Item[];
  fish: Item[];
  artifacts: Item[];
  minerals: Item[];
  cooking: Recipe[];
  crafting: Recipe[];
  bundles: Bundle[];
  villagers: Record<string, Villager>;
  items: Record<string, Item>;
  recipes: Record<string, Recipe>;
}

export interface Recipe {
  name: string;
  ingredients: Record<string, number>;
  result: Item;
  amount: number;
  sources?: string[];
}

export interface Item {
  id: string;
  isCraftable: boolean;
  name: string;
  description: string;
  category: string;
  sprite: string;
  url?: string;
  sources?: string[];
  seasons?: string[];
  locations?: string[];
  time?: string;
  weather?: string;
  water?: string;
  artifactSpots?: Record<string, number>;
  ingredients?: Record<string, number>;
  monsterDrops?: Record<string, number>;
  recipeSources?: string[];
}

export interface Bundle {
  name: string;
  id: number;
  section: string;
  slots: number;
  items: {
    id: string;
    amount: number;
    quality: number;
  }[];
  gold: number;
}

export interface Villager {
  name: string;
  datable: boolean;
  bestGifts: Item[];
  birthday: string;
  birthDate: number;
}

interface GameInfoModule extends Partial<GameInfo> {
  fetch(customFetch?: typeof fetch): Promise<GameInfo>;
  ready(): this is Required<GameInfoModule>;
}

export const gameInfo: GameInfoModule = {
  async fetch(this: Required<GameInfoModule>, customFetch = globalThis.fetch) {
    if (this.items == null) {
      const json = await customFetch("game-info.json").then((response) =>
        response.json()
      ) as RawGameInfo;

      this.items = json.items;
      this.recipes = Object.fromEntries(
        Object.entries(json.recipes)
          .map(([name, recipe]) => [name, {
            ...recipe,
            result: json.items[recipe.result],
          }]),
      );
      this.shipping = json.shipping.map((id) => this.items[id]);
      this.fish = json.fish.map((id) => this.items[id]);
      this.artifacts = json.artifacts.map((id) => this.items[id]);
      this.minerals = json.minerals.map((id) => this.items[id]);
      this.cooking = json.cooking.map((name) => this.recipes[name]);
      this.crafting = json.crafting.map((name) => this.recipes[name]);
      this.bundles = json.bundles;
      this.villagers = Object.fromEntries(
        Object.entries(json.villagers)
          .map(([name, villager]) => [name, {
            ...villager,
            bestGifts: villager.bestGifts.map((id) => this.items[id]),
          }]),
      );
    }

    return {
      items: this.items,
      recipes: this.recipes,
      shipping: this.shipping,
      fish: this.fish,
      artifacts: this.artifacts,
      minerals: this.minerals,
      cooking: this.cooking,
      crafting: this.crafting,
      bundles: this.bundles,
      villagers: this.villagers,
    };
  },
  ready() {
    return typeof this.items !== "undefined" &&
      typeof this.recipes !== "undefined" &&
      typeof this.shipping !== "undefined" &&
      typeof this.fish !== "undefined" &&
      typeof this.artifacts !== "undefined" &&
      typeof this.minerals !== "undefined" &&
      typeof this.cooking !== "undefined" &&
      typeof this.crafting !== "undefined" &&
      typeof this.bundles !== "undefined" &&
      typeof this.villagers !== "undefined";
  },
};
export default gameInfo;
