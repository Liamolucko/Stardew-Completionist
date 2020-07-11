/// <reference path="./backend.d.ts" />

import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Observable, ReplaySubject } from 'rxjs';
import { GameInfoService, Villager } from './game-info.service';

@Injectable({
  providedIn: 'root',
})
export class SaveInfoService implements SaveInfo {
  get name(): string { return this.currentSave?.name; }
  get lastSaved(): number { return this.currentSave?.lastSaved; }

  get currentDay(): number { return this.currentSave?.currentDay; }
  get currentSeason(): number { return this.currentSave?.currentSeason; }
  get currentYear(): number { return this.currentSave?.currentYear; }
  get currentDate(): number { return this.currentSave?.currentDate; }

  get collectedItems(): string[] { return this.currentSave?.collectedItems; }
  get knownRecipes(): string[] { return this.currentSave?.knownRecipes; }

  get relationships(): Map<string, Relationship> { return this.currentSave?.relationships; }

  get isElectron(): boolean { return window.backend != null; }

  currentSave?: SaveInfo;

  updated: Observable<SaveInfo>;

  private updateSubject = new ReplaySubject<SaveInfo>(1);

  constructor(private gameInfo: GameInfoService, private storage: NgForage) {
    this.updated = this.updateSubject.asObservable();

    void this.storage.getItem<SaveInfo>('lastSaveFile').then(lastSaveFile => {
      if (lastSaveFile) {
        this.setSaveFile(lastSaveFile);
      }
    });
  }

  async getSaveFiles(): Promise<SaveInfo[] | null> {
    if (window.backend) {
      const saveFiles = await backend.getSaveFiles();
      return saveFiles.map(save => this.getSaveFileInfo(save, false));
    } else {
      return null;
    }
  }

  async updateFromFile(file: File): Promise<void> {
    const xml = await file.text();
    void this.storage.setItem('lastSaveFile', this.getSaveFileInfo(xml));
  }

  getSaveFileInfo(xml: string, updateCurrent = true): SaveInfo {
    const parser = new DOMParser();
    const xmlDoc: XMLDocument = parser.parseFromString(xml.trim(), 'text/xml');

    let saveInfo: Partial<SaveInfo>;
    try {
      saveInfo = {
        name: xmlDoc.querySelector('Farmer > name').textContent.trim(),
        currentDay: parseInt(xmlDoc.querySelector('dayOfMonthForSaveGame').textContent.trim(), 10),
        currentSeason: parseInt(xmlDoc.querySelector('seasonForSaveGame').textContent.trim(), 10),
        currentYear: parseInt(xmlDoc.querySelector('yearForSaveGame').textContent.trim(), 10),
        lastSaved: parseInt(xmlDoc.querySelector('saveTime').textContent.trim(), 10)
      };
    } catch {
      throw new Error('Invalid save file');
    }

    saveInfo.currentDate = saveInfo.currentSeason * 28 + saveInfo.currentDay;

    saveInfo.collectedItems = [];
    xmlDoc.querySelector('Farmer > basicShipped').querySelectorAll('item').forEach(item => {
      saveInfo.collectedItems.push(item.querySelector('key').textContent.trim());
    });
    xmlDoc.querySelector('Farmer > mineralsFound').querySelectorAll('item').forEach(item => {
      saveInfo.collectedItems.push(item.querySelector('key').textContent.trim());
    });
    xmlDoc.querySelector('Farmer > recipesCooked').querySelectorAll('item').forEach(item => {
      saveInfo.collectedItems.push(item.querySelector('key').textContent.trim());
    });
    xmlDoc.querySelector('Farmer > fishCaught').querySelectorAll('item').forEach(item => {
      saveInfo.collectedItems.push(item.querySelector('key').textContent.trim());
    });
    xmlDoc.querySelector('Farmer > archaeologyFound').querySelectorAll('item').forEach(item => {
      saveInfo.collectedItems.push(item.querySelector('key').textContent.trim());
    });

    saveInfo.knownRecipes = [];
    xmlDoc.querySelector('Farmer > craftingRecipes').querySelectorAll('item').forEach(item => {
      const recipeName = item.querySelector('key').textContent.trim();
      const amountMade = parseInt(item.querySelector('value').textContent.trim(), 10);
      const recipe = this.gameInfo.recipes.get(recipeName);
      saveInfo.knownRecipes.push(recipeName);
      if (amountMade > 0) { saveInfo.collectedItems.push(recipe.result.id); }
    });
    xmlDoc.querySelectorAll('Farmer > cookingRecipes > item').forEach(item => {
      saveInfo.knownRecipes.push(item.querySelector('key').textContent.trim());
    });


    saveInfo.relationships = new Map<string, Relationship>();
    xmlDoc.querySelectorAll('Farmer > friendshipData > item').forEach(relationship => {
      const friendship = relationship.querySelector('value > Friendship');
      const name = relationship.querySelector('key').textContent.trim();
      const villager = this.gameInfo.villagers.find(value => value.name === name);
      if (villager) {
        saveInfo.relationships.set(name, {
          villager,
          hearts: parseInt(friendship.querySelector('Points').textContent.trim(), 10) / 250,
          maxHearts: relationship.querySelector('Status').textContent.trim() === 'Married' ? 14 : villager.datable ? 8 : 10,
          giftsThisWeek: parseInt(relationship.querySelector('GiftsThisWeek').textContent.trim(), 10)
        }
        );
      }
    });

    if (updateCurrent) {
      this.setSaveFile(saveInfo as SaveInfo);
    }

    return saveInfo as SaveInfo;
  }

  setSaveFile(save: SaveInfo): void {
    this.currentSave = save;

    for (const villager of this.gameInfo.villagers) {
      villager.relationship = this.relationships.get(villager.name);
    }

    void this.storage.setItem('lastSaveFile', save);

    this.updateSubject.next(save);
  }
}

export interface SaveInfo {
  name: string;
  lastSaved: number;

  currentDay: number;
  currentSeason: number;
  currentYear: number;
  currentDate: number;

  collectedItems: string[];
  knownRecipes: string[];

  relationships: Map<string, Relationship>;
}

export interface Relationship {
  villager: Villager;
  hearts: number;
  maxHearts: number;
  giftsThisWeek: number;
}
