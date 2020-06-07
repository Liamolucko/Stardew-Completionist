import { Injectable } from '@angular/core';

export const categories = new Map<string, string>([
  ['-4', 'Any Fish'],
  ['-5', 'Egg'],
  ['-6', 'Milk'],
  ['-777', 'Wild Seeds']
]);

export const locationNames = new Map([
  ['Farm', 'Farm'],
  ['UndergroundMine', 'Mines'],
  ['Mine', 'Mines'],
  ['Desert', 'Desert'],
  ['BusStop', 'Bus Stop'],
  ['Forest', 'Forest'],
  ['Town', 'Pelican Town'],
  ['Mountain', 'Mountain'],
  ['Backwoods', 'Backwoods'],
  ['Railroad', 'Railroad'],
  ['Beach', 'Beach'],
  ['Woods', 'Woods'],
  ['Sewer', 'Sewers'],
  ['BugLand', 'Bug Land'],
  ['WitchSwamp', 'Witch Swamp'],
  ['fishingGame', 'Fishing Game'],
  ['Temp', '???']
]);

export const seasonNames = new Map([
  [0, 'Spring'],
  [1, 'Summer'],
  [2, 'Fall'],
  [3, 'Winter']
]);

export const weatherNames = new Map([
  ['rainy', 'Rain'],
  ['sunny', 'Sun']
]);

@Injectable({
  providedIn: 'root',
})
export class GameInfoService implements GameInfo {
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

  constructor() { }

  async load(): Promise<GameInfo> {
    const json = await fetch('assets/game-info.json').then(response => response.json()) as _GameInfo;

    this.items = new Map(Object.entries(json.items));
    this.recipes = new Map(Object.entries(json.recipes).map(([id, recipe]) => [id, { ...recipe, result: this.items.get(recipe.result) }]));
    this.shipping = json.shipping.map(id => this.items.get(id));
    this.fish = json.fish.map(id => this.items.get(id));
    this.artifacts = json.artifacts.map(id => this.items.get(id));
    this.minerals = json.minerals.map(id => this.items.get(id));
    this.cooking = json.cooking.map(id => this.recipes.get(id));
    this.crafting = json.crafting.map(id => this.recipes.get(id));
    this.bundles = json.bundles;
    this.villagers = json.villagers.map(villager => ({
      name: villager.name,
      birthday: `${seasonNames.get(villager.birthSeason)} ${villager.birthDay}`,
      birthDate: villager.birthSeason * 28 + villager.birthDay,
      loves: villager.loves.map(id => this.items.get(id)),
      likes: villager.likes.map(id => this.items.get(id)),
      neutral: villager.neutral.map(id => this.items.get(id)),
      dislikes: villager.dislikes.map(id => this.items.get(id)),
      hates: villager.hates.map(id => this.items.get(id))
    }));

    return this as GameInfo;
  }
}

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
  items: {
    [id: string]: Item;
  };
  recipes: {
    [id: string]: _Recipe;
  };
}

interface _Recipe {
  name: string;
  ingredients: {
    [id: string]: number;
  };
  result: string;
  amount: number;
  recipeSources?: string[];
}

interface _Villager {
  name: string;
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

interface Recipe {
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
  name: string;
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
  time?: string;
  weather?: 'sunny' | 'rainy' | 'both';
  water?: 'ocean' | 'freshwater';
  artifactSpots?: {
    [location: string]: number;
  };
  ingredients?: {
    [id: string]: number;
  };
  monsterDrops?: {
    [monster: string]: number;
  };
  recipeSources: string[];
}

export interface Bundle {
  name: string;
  section: string;
  slots: number;
  items: {
    name: string;
    amount: number;
    quality: number;
  }[];
  gold: number;
}

export interface Villager {
  name: string;
  loves: Item[];
  likes: Item[];
  neutral: Item[];
  dislikes: Item[];
  hates: Item[];
  birthday: string;
  birthDate: number;
}
