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
