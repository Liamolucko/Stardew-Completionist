/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as localForage from "localforage";
import { writable } from "svelte/store";
import backend from "./backend";
import _gameInfo from "./game-info";
import { assert } from "./util";

export interface SaveInfo {
  id: string | null;

  name: string;
  lastSaved: number;

  currentDay: number;
  currentSeason: number;
  currentYear: number;
  currentDate: number;

  collectedItems: string[];
  knownRecipes: string[];

  relationships: Map<string, Relationship>;

  bundleCompletion: Map<number, boolean[]>;
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
    if (typeof save === "string") {
      if (typeof unsubscribeFromLast !== "undefined") unsubscribeFromLast();
      if (typeof backend === "undefined") {
        throw Error("Cannot use save ID in web version");
      }

      backend.watchSaveFile(save).then((store) =>
        store.subscribe(async (data) => {
          if (isValidSaveFile(data)) {
            this.set(await processSaveFile({ id: save, data }));
          }
        })
      );
    } else {
      localForage.setItem("lastSaveFile", save);
      _save.set(save);
    }
  },
};

export function isValidSaveFile(
  file: string | { id: string; data: string } | XMLDocument,
): boolean {
  const save =
    (file instanceof XMLDocument ? file : new DOMParser().parseFromString(
      (typeof file === "string" ? file : file.data).trim(),
      "text/xml",
    )).querySelector("SaveGame");

  if (save === null) return false;

  return save.querySelector("player > name") !== null &&
    save.querySelector("player > cookingRecipes") !== null &&
    save.querySelector("player > craftingRecipes") !== null &&
    save.querySelector("player > basicShipped") !== null &&
    save.querySelector("player > mineralsFound") !== null &&
    save.querySelector("player > recipesCooked") !== null &&
    save.querySelector("player > archaeologyFound") !== null &&
    save.querySelector("player > fishCaught") !== null &&
    save.querySelector("player > friendshipData") !== null &&
    save.querySelector("dayOfMonth") !== null &&
    save.querySelector("player > seasonForSaveGame") !== null &&
    save.querySelector("year") !== null &&
    save.querySelector("player > saveTime") !== null &&
    Array.from(save.querySelectorAll("locations > GameLocation")).find((el) =>
        el.getAttribute("xsi:type") == "CommunityCenter"
      ) !== null;
}

// TODO: switch to other element of save file (so i can get community center data)
function getSaveFileData(
  file: string | { id: string; data: string } | XMLDocument,
): {
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
  bundles: Element[];
} {
  const save =
    (file instanceof XMLDocument ? file : new DOMParser().parseFromString(
      (typeof file === "string" ? file : file.data).trim(),
      "text/xml",
    )).querySelector("SaveGame");
  if (save === null) throw Error("Invalid save file");

  const data = {
    name: save.querySelector("player > name"),
    cookingRecipes: save.querySelector("player > cookingRecipes"),
    craftingRecipes: save.querySelector("player > craftingRecipes"),
    itemsShipped: save.querySelector("player > basicShipped"),
    mineralsFound: save.querySelector("player > mineralsFound"),
    recipesCooked: save.querySelector("player > recipesCooked"),
    artifactsFound: save.querySelector("player > archaeologyFound"),
    fishCaught: save.querySelector("player > fishCaught"),
    friendships: save.querySelector("player > friendshipData"),
    currentDay: save.querySelector("dayOfMonth"),
    currentSeason: save.querySelector("player > seasonForSaveGame"),
    currentYear: save.querySelector("year"),
    lastSaved: save.querySelector("player > saveTime"),
    bundles: Array.from(
      Array.from(save.querySelectorAll("locations > GameLocation"))
        .find((el) => el.getAttribute("xsi:type") == "CommunityCenter")
        ?.querySelectorAll("bundles > item") ?? [],
    ),
  };

  if (Object.values(data).some((item) => item === null)) {
    throw Error(
      `Invalid save file ${
        typeof file !== "string" && !(file instanceof XMLDocument)
          ? file.id
          : save.querySelector("name")?.textContent?.trim()
      }`,
    );
  }

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
    bundles: Element[];
  };
}

/**
 * Gets `element.querySelector(selectors)`, but throws error of your choice if it does not exist.
 */
function assertQuerySelector(
  element: Element,
  selectors: string,
  message?: string,
): Element {
  const child = element.querySelector(selectors);
  assert(child !== null, message);
  return child;
}

export async function processSaveFile(
  file: string | { id: string; data: string } | XMLDocument,
): Promise<SaveInfo> {
  const data = getSaveFileData(file);

  const currentDay = parseInt(data.currentDay.textContent!, 10);
  const currentSeason = parseInt(data.currentSeason.textContent!, 10);

  const gameInfo = await _gameInfo.fetch();

  const errorMessage = `Invalid save file ${
    typeof file !== "string" && !(file instanceof XMLDocument)
      ? file.id
      : data.name.textContent!.trim()
  }`;

  return {
    id: typeof file !== "string" && !(file instanceof XMLDocument)
      ? file.id
      : null,
    name: data.name.textContent!.trim(),
    lastSaved: parseInt(data.lastSaved.textContent!, 10),

    currentDay,
    currentSeason,
    currentYear: parseInt(data.currentYear.textContent!, 10),
    currentDate: currentSeason * 28 + currentDay,

    collectedItems: [
      ...Array.from(data.itemsShipped.querySelectorAll("item")),
      ...Array.from(data.mineralsFound.querySelectorAll("item")),
      ...Array.from(data.recipesCooked.querySelectorAll("item")),
      ...Array.from(data.artifactsFound.querySelectorAll("item")),
      ...Array.from(data.fishCaught.querySelectorAll("item")),
    ].map((item) =>
      assertQuerySelector(item, "key", errorMessage).textContent!.trim()
    )
      .concat(
        Array.from(data.craftingRecipes.querySelectorAll("item"))
          .filter((item) =>
            parseInt(
                item.querySelector("value")?.textContent?.trim() ?? "-1",
                10,
              ) > 0 &&
            gameInfo.recipes.has(
              assertQuerySelector(item, "key", errorMessage).textContent!,
            )
          )
          .map((item) =>
            gameInfo.recipes.get(
              assertQuerySelector(item, "key", errorMessage).textContent!,
            )!.result.id
          ),
      ),
    knownRecipes: [
      ...Array.from(data.cookingRecipes.querySelectorAll("item")),
      ...Array.from(data.craftingRecipes.querySelectorAll("item")),
    ]
      .map((item) =>
        assertQuerySelector(item, "key", errorMessage).textContent!.trim()
      ),

    relationships: new Map(
      Array.from(data.friendships.querySelectorAll("item")).map(
        (relationship) => {
          const friendship = assertQuerySelector(
            relationship,
            "value > Friendship",
            errorMessage,
          );
          const name = assertQuerySelector(relationship, "key", errorMessage)
            .textContent!.trim();

          const villager = gameInfo.villagers.find((value) =>
            value.name === name
          );

          if (typeof villager !== "undefined") {
            return [name, {
              hearts: parseInt(
                assertQuerySelector(friendship, "Points", errorMessage)
                  .textContent!,
                10,
              ) / 250,
              maxHearts: assertQuerySelector(friendship, "Status", errorMessage)
                  .textContent!.trim() === "Married"
                ? 14
                : villager.datable
                ? 8
                : 10,
              giftsThisWeek: parseInt(
                assertQuerySelector(friendship, "GiftsThisWeek", errorMessage)
                  .textContent!.trim(),
                10,
              ),
            }];
          }
        },
      ).filter((item) => typeof item !== "undefined") as [
        string,
        Relationship,
      ][],
    ),

    bundleCompletion: new Map(data.bundles
      .map((el) => [
        parseInt(el.querySelector("key")?.textContent!),
        Array.from(el.querySelectorAll("value > ArrayOfBoolean > boolean")).map(
          (el) => el.textContent == "true",
        ),
      ])),
  };
}

export async function getSaveFiles(savesDir?: string): Promise<SaveInfo[]> {
  assert(typeof backend !== "undefined", "Electron backend not available");
  if (typeof savesDir !== "undefined") backend.setSavesDir(savesDir);
  return await backend.getSaveFiles().then((saves) =>
    Promise.all(
      saves.map(async (save) =>
        isValidSaveFile(save) ? await processSaveFile(save) : null
      ),
    )
      .then((saves) => saves.filter((save) => save !== null) as SaveInfo[])
  );
}

// This doesn't technically exist, but Sapper replaces every occurence of process.browser with true or false depending if it's in the browser.
declare const process: { browser: boolean };
if (process.browser) {
  localForage.getItem<SaveInfo>("lastSaveFile").then((saveInfo) => {
    if (saveInfo !== null) save.set(saveInfo.id ?? saveInfo);
  });
}

export default save;
