/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as localForage from "localforage";
import { writable } from "svelte/store";
import backend from './backend';
import _gameInfo from "./game-info";
import { assert } from "./util";

export interface SaveInfo {
  id: string;

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
  hearts: number;
  maxHearts: number;
  giftsThisWeek: number;
}

const _save = writable<SaveInfo | null>(null);
let unsubscribeFromLast: () => void;
export const save = {
  subscribe: _save.subscribe,
  set(save: SaveInfo | string): void {
    if (typeof save === 'string') {
      if (typeof unsubscribeFromLast !== 'undefined') unsubscribeFromLast();
      if (typeof backend === 'undefined') throw Error('Cannot use save ID in web version');

      backend.watchSaveFile(save).then(store => store.subscribe(async data => {
        if (isValidSaveFile(data)) {
          this.set(await processSaveFile({ id: save, data }));
        }
      }));
    } else {
      localForage.setItem('lastSaveFile', save);
      _save.set(save);
    }
  }
};

export function isValidSaveFile(file: string | { id: string, data: string; } | XMLDocument): boolean {
  const farmer = (file instanceof XMLDocument ? file : new DOMParser().parseFromString((typeof file === 'string' ? file : file.data).trim(), 'text/xml')).querySelector('Farmer');

  if (farmer === null) return false;

  return farmer.querySelector('name') !== null
    && farmer.querySelector('cookingRecipes') !== null
    && farmer.querySelector('craftingRecipes') !== null
    && farmer.querySelector('basicShipped') !== null
    && farmer.querySelector('mineralsFound') !== null
    && farmer.querySelector('recipesCooked') !== null
    && farmer.querySelector('archaeologyFound') !== null
    && farmer.querySelector('fishCaught') !== null
    && farmer.querySelector('friendshipData') !== null
    && farmer.querySelector('dayOfMonthForSaveGame') !== null
    && farmer.querySelector('seasonForSaveGame') !== null
    && farmer.querySelector('yearForSaveGame') !== null
    && farmer.querySelector('saveTime') !== null;
}

function getSaveFileData(file: string | { id: string, data: string; } | XMLDocument): {
  name: Element;
  cookingRecipes: Element;
  craftingRecipes: Element;
  itemsShipped: Element;
  mineralsFound: Element;
  recipesCooked: Element;
  artifactsFound: Element;
  fishCaught: Element;
  friendships: Element;
  currentDay: Element;
  currentSeason: Element;
  currentYear: Element;
  lastSaved: Element;
} {
  const farmer = (file instanceof XMLDocument ? file : new DOMParser().parseFromString((typeof file === 'string' ? file : file.data).trim(), 'text/xml')).querySelector('Farmer');
  if (farmer === null) throw Error('Invalid save file');

  const data = {
    name: farmer.querySelector('name'),
    cookingRecipes: farmer.querySelector('cookingRecipes'),
    craftingRecipes: farmer.querySelector('craftingRecipes'),
    itemsShipped: farmer.querySelector('basicShipped'),
    mineralsFound: farmer.querySelector('mineralsFound'),
    recipesCooked: farmer.querySelector('recipesCooked'),
    artifactsFound: farmer.querySelector('archaeologyFound'),
    fishCaught: farmer.querySelector('fishCaught'),
    friendships: farmer.querySelector('friendshipData'),
    currentDay: farmer.querySelector('dayOfMonthForSaveGame'),
    currentSeason: farmer.querySelector('seasonForSaveGame'),
    currentYear: farmer.querySelector('yearForSaveGame'),
    lastSaved: farmer.querySelector('saveTime'),
  };

  if (Object.values(data).some(item => item === null)) throw Error(`Invalid save file ${typeof file !== 'string' && !(file instanceof XMLDocument) ? file.id : farmer.querySelector('name')?.textContent?.trim()}`);

  return data as {
    name: Element;
    cookingRecipes: Element;
    craftingRecipes: Element;
    itemsShipped: Element;
    mineralsFound: Element;
    recipesCooked: Element;
    artifactsFound: Element;
    fishCaught: Element;
    friendships: Element;
    currentDay: Element;
    currentSeason: Element;
    currentYear: Element;
    lastSaved: Element;
  };
}

/**
 * Gets `element.querySelector(selectors)`, but throws error of your choice if it does not exist.
 */
function assertQuerySelector(element: Element, selectors: string, message?: string): Element {
  const child = element.querySelector(selectors);
  assert(child !== null, message);
  return child;
}

export async function processSaveFile(file: string | { id: string, data: string; } | XMLDocument): Promise<SaveInfo> {
  const data = getSaveFileData(file);

  const currentDay = parseInt(data.currentDay.textContent!, 10);
  const currentSeason = parseInt(data.currentSeason.textContent!, 10);

  const gameInfo = await _gameInfo.fetch();

  const errorMessage = `Invalid save file ${typeof file !== 'string' && !(file instanceof XMLDocument) ? file.id : data.name.textContent!.trim()}`;

  return {
    id: typeof file !== 'string' && !(file instanceof XMLDocument) ? file.id : data.name.textContent!.trim(),
    name: data.name.textContent!.trim(),
    lastSaved: parseInt(data.lastSaved.textContent!, 10),

    currentDay,
    currentSeason,
    currentYear: parseInt(data.currentYear.textContent!, 10),
    currentDate: currentSeason * 28 + currentDay,

    collectedItems: [
      ...Array.from(data.itemsShipped.querySelectorAll('item')),
      ...Array.from(data.mineralsFound.querySelectorAll('item')),
      ...Array.from(data.recipesCooked.querySelectorAll('item')),
      ...Array.from(data.artifactsFound.querySelectorAll('item')),
      ...Array.from(data.fishCaught.querySelectorAll('item'))
    ].map(item => assertQuerySelector(item, 'key', errorMessage).textContent!.trim())
      .concat(
        Array.from(data.craftingRecipes.querySelectorAll('item'))
          .filter(item => parseInt(item.querySelector('value')?.textContent?.trim() ?? '-1', 10) > 0 && gameInfo.recipes.has(assertQuerySelector(item, 'key', errorMessage).textContent!))
          .map(item => gameInfo.recipes.get(assertQuerySelector(item, 'key', errorMessage).textContent!)!.result.id)
      ),
    knownRecipes: [...Array.from(data.cookingRecipes.querySelectorAll('item')), ...Array.from(data.craftingRecipes.querySelectorAll('item'))]
      .map(item => assertQuerySelector(item, 'key', errorMessage).textContent!.trim()),

    relationships: new Map(Array.from(data.friendships.querySelectorAll('item')).map(relationship => {
      const friendship = assertQuerySelector(relationship, 'value > Friendship', errorMessage);
      const name = assertQuerySelector(relationship, 'key', errorMessage).textContent!.trim();

      const villager = gameInfo.villagers.find(value => value.name === name);

      if (typeof villager !== 'undefined') {
        return [name, {
          hearts: parseInt(assertQuerySelector(friendship, 'Points', errorMessage).textContent!, 10) / 250,
          maxHearts: assertQuerySelector(friendship, 'Status', errorMessage).textContent!.trim() === 'Married' ? 14 : villager.datable ? 8 : 10,
          giftsThisWeek: parseInt(assertQuerySelector(friendship, 'GiftsThisWeek', errorMessage).textContent!.trim(), 10)
        }];
      }
    }).filter(item => typeof item !== 'undefined') as [string, Relationship][])
  };
}

export async function getSaveFiles(savesDir?: string): Promise<SaveInfo[]> {
  assert(typeof backend !== 'undefined', 'Electron backend not available');
  if (typeof savesDir !== 'undefined') backend.setSavesDir(savesDir);
  return await backend.getSaveFiles().then(saves =>
    Promise.all(saves.map(async save => isValidSaveFile(save) ? await processSaveFile(save) : null))
      .then(saves => saves.filter(save => save !== null) as SaveInfo[])
  );
}

declare const process: { browser: boolean; };
if (process.browser) {
  localForage.getItem<SaveInfo>('lastSaveFile').then(save.set);
}

export default save;