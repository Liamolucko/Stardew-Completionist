import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

  ready: Promise<Map<string, Item>>

  constructor(private http: HttpClient) {
    const request = this.http.get<GameInfo>("assets/game-info.json", { "observe": "body", "responseType": "json" })
    request.subscribe(response => {
      this.items = new Map(Object.entries(response.items))

      this.shipping = response.shipping.map(item => this.items.get(item))
      this.fish = response.fish.map(item => this.items.get(item))
      this.artifacts = response.artifacts.map(item => this.items.get(item))
      this.minerals = response.minerals.map(item => this.items.get(item))
      this.cooking = response.cooking.map(item => this.items.get(item))
      this.bundles = response.bundles
      this.friendship = response.friendship
    })

    this.ready = request.toPromise().then(() => { return this.items })
  }
}

interface GameInfo {
  shipping: string[]
  fish: string[]
  artifacts: string[]
  minerals: string[]
  cooking: string[]
  bundles: Bundle[]
  friendship: Villager[]
  items: {
    [id: string]: Item
}
}

export interface Item {
  id: string
  name: string
  url: string
  imageUrl: string
  sources?: string[]
  seasons?: {
    spring: boolean
    summer: boolean
    fall: boolean
    winter: boolean
  }
  locations?: string[]
  time?: string
  weather?: 'sunny' | 'rainy' | 'both'
  water?: 'ocean' | 'freshwater'
  artifactSpots?: {
    [location: string]: number
  }
  ingredients?: {
    [id: string]: number
  }
  monsterDrops?: {
    [monster: string]: number
  }
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
