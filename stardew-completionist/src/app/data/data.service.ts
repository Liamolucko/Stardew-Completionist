import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  shipping: Item[]
  fish: Item[]
  artifacts: Item[]
  minerals: Item[]
  cooking: Item[]
  bundles: Bundle[]
  friendship: Villager[]
  items: Map<string, Item>

  constructor(private http: HttpClient) {
    http.get<GameInfo>("assets/game-info.json", { "observe": "body", "responseType": "json" }).subscribe(response => {
      this.items = response.items
      
      this.shipping = response.items_shipped.map(item => this.items[item])
      this.fish = response.fish.map(item => this.items[item])
      this.artifacts = response.artifacts.map(item => this.items[item])
      this.minerals = response.minerals.map(item => this.items[item])
      this.cooking = response.cooking.map(item => this.items[item])
      this.bundles = response.bundles
      this.friendship = response.friendship
    })
  }
}

interface GameInfo {
  items_shipped: string[]
  fish: string[]
  artifacts: string[]
  minerals: string[]
  cooking: string[]
  bundles: Bundle[]
  friendship: Villager[]
  items: Map<string, Item>
}

export interface Item {
  name: string
  url: Url
  image_url: Url
  season: {
    spring: boolean
    summer: boolean
    fall: boolean
    winter: boolean
  }
  locations: string[]
  time: string
  weather: {
    sun: boolean
    rain: boolean
  }
  sources: string[]
  ingredients: string[]
}

export interface Bundle {
  name: string
  section: string
  slots: number
  items: {
    name: string
    amount: number
    quality: number
  }[]
  gold: number
}

export interface Villager {
  name: string
  favorites: string[]
  birth_season: string
  birth_day: number
}
