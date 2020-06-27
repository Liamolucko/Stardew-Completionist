import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { GameInfoService, Villager } from './game-info.service';

@Injectable({
  providedIn: 'root',
})
export class SaveInfoService implements SaveInfo {
  currentDay?: number;
  currentSeason?: number;
  currentYear?: number;
  currentDate?: number;

  collectedItems?: string[];
  knownRecipes?: string[];

  relationships: Map<string, Relationship>;

  get data(): SaveInfo {
    return {
      currentDay: this.currentDay,
      currentSeason: this.currentSeason,
      currentYear: this.currentYear,
      currentDate: this.currentDate,
      collectedItems: this.collectedItems,
      knownRecipes: this.knownRecipes,
      relationships: this.relationships
    };
  }

  updated: Observable<SaveInfo>;

  private updateSubject = new ReplaySubject<SaveInfo>(1);

  constructor(private gameInfo: GameInfoService) {
    this.updated = this.updateSubject.asObservable();

    if (window.localStorage.getItem('lastSaveFile')) {
      this.updateSaveFileInfo(window.localStorage.getItem('lastSaveFile'));
    }

    document.querySelector('#file-input')?.addEventListener('change', async event => {
      const input: HTMLInputElement = event.target as HTMLInputElement;
      const xml = await input.files[0].text();
      window.localStorage.setItem('lastSaveFile', xml);
      input.value = null;
      this.updateSaveFileInfo(xml);
    });
  }

  updateSaveFileInfo(xml: string): void {
    const parser = new DOMParser();
    const xmlDoc: XMLDocument = parser.parseFromString(xml, 'text/xml');

    this.currentDay = parseInt(
      xmlDoc.querySelector('dayOfMonthForSaveGame').textContent, 10
    );
    this.currentSeason = parseInt(
      xmlDoc.querySelector('seasonForSaveGame').textContent, 10
    );
    this.currentYear = parseInt(
      xmlDoc.querySelector('yearForSaveGame').textContent, 10
    );
    this.currentDate = this.currentSeason * 28 + this.currentDay;

    this.collectedItems = [];
    xmlDoc.querySelector('Farmer > basicShipped').querySelectorAll('item').forEach(item => {
      this.collectedItems.push(item.querySelector('key').textContent);
    });
    xmlDoc.querySelector('Farmer > mineralsFound').querySelectorAll('item').forEach(item => {
      this.collectedItems.push(item.querySelector('key').textContent);
    });
    xmlDoc.querySelector('Farmer > recipesCooked').querySelectorAll('item').forEach(item => {
      this.collectedItems.push(item.querySelector('key').textContent);
    });
    xmlDoc.querySelector('Farmer > fishCaught').querySelectorAll('item').forEach(item => {
      this.collectedItems.push(item.querySelector('key').textContent);
    });
    xmlDoc.querySelector('Farmer > archaeologyFound').querySelectorAll('item').forEach(item => {
      this.collectedItems.push(item.querySelector('key').textContent);
    });

    this.knownRecipes = [];
    xmlDoc.querySelector('Farmer > craftingRecipes').querySelectorAll('item').forEach(item => {
      const recipeName = item.querySelector('key').textContent;
      const amountMade = parseInt(item.querySelector('value').textContent, 10);
      const recipe = this.gameInfo.recipes.get(recipeName);
      this.knownRecipes.push(recipeName);
      if (amountMade > 0) { this.collectedItems.push(recipe.result.id); }
    });
    xmlDoc.querySelectorAll('Farmer > cookingRecipes > item').forEach(item => {
      this.knownRecipes.push(item.querySelector('key').textContent);
    });


    this.gameInfo.villagers = this.gameInfo.villagers.map(villager => ({ ...villager, relationship: undefined }));
    this.relationships = new Map<string, Relationship>();

    xmlDoc.querySelectorAll('Farmer > friendshipData > item').forEach(relationship => {
      const friendship = relationship.querySelector('value > Friendship');
      const name = relationship.querySelector('key').textContent;
      const villager = this.gameInfo.villagers.find(value => value.name === name);
      if (villager != null) {
        villager.relationship = {
          villager,
          hearts: parseInt(friendship.querySelector('Points').textContent, 10) / 250,
          maxHearts: relationship.querySelector('Status').textContent === 'Married' ? 14 : villager.datable ? 8 : 10,
          giftsThisWeek: parseInt(relationship.querySelector('GiftsThisWeek').textContent, 10)
        };
        this.relationships.set(
          name,
          villager.relationship
        );
      }
    });

    for (const villager of this.gameInfo.villagers.filter(value => !this.relationships.has(value.name))) {
      this.relationships.set(villager.name, {
        villager,
        hearts: 0,
        maxHearts: 10,
        giftsThisWeek: 0
      });
      villager.relationship = this.relationships.get(villager.name);
    }

    this.updateSubject.next(this.data);
  }
}

export interface SaveInfo {
  currentDay?: number;
  currentSeason?: number;
  currentYear?: number;
  currentDate?: number;

  collectedItems?: string[];
  knownRecipes?: string[];

  relationships: Map<string, Relationship>;
}

export interface Relationship {
  villager: Villager;
  hearts: number;
  maxHearts: number;
  giftsThisWeek: number;
}
