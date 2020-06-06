import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaveInfoService implements SaveInfo {
  currentDay?: number;
  currentSeason?: number;
  currentYear?: number;

  collectedItems?: string[];

  get data(): SaveInfo {
    return {
      currentDay: this.currentDay,
      currentSeason: this.currentSeason,
      currentYear: this.currentYear,
      collectedItems: this.collectedItems
    };
  }

  updated: Observable<SaveInfo>;

  private updateSubject = new ReplaySubject<SaveInfo>(1);

  constructor() {
    this.updated = this.updateSubject.asObservable();

    if (window.localStorage.getItem('lastSaveFile')) {
      this.updateSaveFileInfo(window.localStorage.getItem('lastSaveFile'));
    }

    document.querySelector('#file-input').addEventListener('change', async event => {
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

    this.collectedItems = [];
    xmlDoc.querySelector('Farmer > basicShipped').querySelectorAll('item')
      .forEach((item) => {
        this.collectedItems.push(item.querySelector('key').textContent);
      });
    xmlDoc.querySelector('Farmer > mineralsFound').querySelectorAll('item')
      .forEach((item) => {
        this.collectedItems.push(item.querySelector('key').textContent);
      });
    xmlDoc.querySelector('Farmer > recipesCooked').querySelectorAll('item')
      .forEach((item) => {
        this.collectedItems.push(item.querySelector('key').textContent);
      });
    xmlDoc.querySelector('Farmer > fishCaught').querySelectorAll('item')
      .forEach((item) => {
        this.collectedItems.push(item.querySelector('key').textContent);
      });
    xmlDoc.querySelector('Farmer > archaeologyFound').querySelectorAll('item')
      .forEach((item) => {
        this.collectedItems.push(item.querySelector('key').textContent);
      });

    this.updateSubject.next(this.data);
  }
}

export interface SaveInfo {
  currentDay?: number;
  currentSeason?: number;
  currentYear?: number;

  collectedItems?: string[];
}
