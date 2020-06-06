import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService implements GameInfo {
  shipping: Item[];
  fish: Item[];
  artifacts: Item[];
  minerals: Item[];
  cooking: Item[];
  bundles: Bundle[];
  friendship: Villager[];
  items: Map<string, Item>;

  constructor() { }

  async load(): Promise<GameInfo> {
    const json = await fetch('assets/game-info.json').then((response) =>
      response.json()
    ) as _GameInfo;

    const items = new Map(Object.entries(json.items));

    this.items = items;
    this.shipping = json.shipping.map(id => items.get(id));
    this.fish = json.fish.map(id => items.get(id));
    this.artifacts = json.artifacts.map(id => items.get(id));
    this.minerals = json.minerals.map(id => items.get(id));
    this.cooking = json.cooking.map(id => items.get(id));
    this.bundles = json.bundles;
    this.friendship = json.friendship.map((villager) => ({
      ...villager,
      loves: villager.loves.map(id => items.get(id)),
      likes: villager.likes.map(id => items.get(id)),
      neutral: villager.neutral.map(id => items.get(id)),
      dislikes: villager.dislikes.map(id => items.get(id)),
      hates: villager.hates.map(id => items.get(id))
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
  bundles: Bundle[];
  friendship: _Villager[];
  items: {
    [id: string]: Item;
  };
}

export interface GameInfo {
  shipping: Item[];
  fish: Item[];
  artifacts: Item[];
  minerals: Item[];
  cooking: Item[];
  bundles: Bundle[];
  friendship: Villager[];
  items: Map<string, Item>;
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

interface _Villager {
  name: string;
  loves: string[];
  likes: string[];
  neutral: string[];
  dislikes: string[];
  hates: string[];
  birthday: string;
}

export interface Villager {
  name: string;
  loves: Item[];
  likes: Item[];
  neutral: Item[];
  dislikes: Item[];
  hates: Item[];
  birthday: string;
}
