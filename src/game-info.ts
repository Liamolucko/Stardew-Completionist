import { seasonNames } from "./names";

// Structure of actual json file
interface _GameInfo {
  shipping: string[];
  fish: string[];
  artifacts: string[];
  minerals: string[];
  cooking: string[];
  crafting: string[];
  bundles: Bundle[];
  villagers: _Villager[];
  items: Record<string, Item>;
  recipes: Record<string, _Recipe>;
}

interface _Recipe {
  name: string;
  ingredients: Record<string, number>;
  result: string;
  amount: number;
  recipeSources?: string[];
}

interface _Villager {
  name: string;
  datable: boolean;
  loves: string[];
  likes: string[];
  neutral: string[];
  dislikes: string[];
  hates: string[];
  birthDay: number;
  birthSeason: number;
}

export interface GameInfo {
  shipping: Item[];
  fish: Item[];
  artifacts: Item[];
  minerals: Item[];
  cooking: Recipe[];
  crafting: Recipe[];
  bundles: Bundle[];
  villagers: Villager[];
  items: Map<string, Item>;
  recipes: Map<string, Recipe>;
}

export interface Recipe {
  name: string;
  ingredients: {
    [id: string]: number;
  };
  result: Item;
  amount: number;
  recipeSources?: string[];
}

export interface Item {
  id: string;
  isCraftable: boolean;
  name: string;
  description: string;
  category: string;
  url: string;
  sources?: string[];
  seasons?: {
    spring: boolean;
    summer: boolean;
    fall: boolean;
    winter: boolean;
  };
  locations?: string[];
  time?: [number, number];
  weather?: 'sunny' | 'rainy' | 'both';
  water?: 'ocean' | 'freshwater';
  artifactSpots?: Record<string, number>;
  ingredients?: Record<string, number>;
  monsterDrops?: Record<string, number>;
  recipeSources: string[];
  imgData: string;
}

export interface Bundle {
  name: string;
  section: string;
  sectionId: number;
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
  loves: Item[];
  likes: Item[];
  neutral: Item[];
  dislikes: Item[];
  hates: Item[];
  birthday: string;
  birthDate: number;
}

interface GameInfoModule extends Partial<GameInfo> {
  fetch(customFetch?: typeof fetch): Promise<GameInfo>;
  ready(): this is Required<GameInfoModule>;
}

export const gameInfo: GameInfoModule = {
  async fetch(customFetch = globalThis.fetch) {
    if (this.items == null) {
      const json = await customFetch('game-info.json').then(response => response.json()) as _GameInfo;

      this.items = new Map(Object.entries(json.items));
      this.recipes = new Map(Object.entries(json.recipes)
        .map(([name, recipe]) => [name, { ...recipe, result: this.items.get(recipe.result)! }]));
      this.shipping = json.shipping.map(id => this.items.get(id)!);
      this.fish = json.fish.map(id => this.items.get(id)!);
      this.artifacts = json.artifacts.map(id => this.items.get(id)!);
      this.minerals = json.minerals.map(id => this.items.get(id)!);
      this.cooking = json.cooking.map(name => this.recipes.get(name)!);
      this.crafting = json.crafting.map(name => this.recipes.get(name)!);
      this.bundles = json.bundles;
      this.villagers = json.villagers.map(villager => ({
        name: villager.name,
        datable: villager.datable,
        birthday: `${seasonNames.get(villager.birthSeason)} ${villager.birthDay}`,
        birthDate: villager.birthSeason * 28 + villager.birthDay,
        loves: villager.loves.map(id => this.items.get(id)!),
        likes: villager.likes.map(id => this.items.get(id)!),
        neutral: villager.neutral.map(id => this.items.get(id)!),
        dislikes: villager.dislikes.map(id => this.items.get(id)!),
        hates: villager.hates.map(id => this.items.get(id)!)
      } as Villager));
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
      villagers: this.villagers
    };
  },
  ready() {
    return typeof this.items !== 'undefined'
      && typeof this.recipes !== 'undefined'
      && typeof this.shipping !== 'undefined'
      && typeof this.fish !== 'undefined'
      && typeof this.artifacts !== 'undefined'
      && typeof this.minerals !== 'undefined'
      && typeof this.cooking !== 'undefined'
      && typeof this.crafting !== 'undefined'
      && typeof this.bundles !== 'undefined'
      && typeof this.villagers !== 'undefined';
  }
};
export default gameInfo;