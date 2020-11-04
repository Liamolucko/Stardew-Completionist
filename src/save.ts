/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as localForage from "localforage";
import { writable } from "svelte/store";
import backend from "./backend";
import _gameInfo from "./game-info";
import { assert } from "./util";

/** Metadata about a save file */
export interface SaveInfo {
  /** With the Electron backend, the save file ID. With the Native Filesystem API, the handle to the save file's directory.  */
  handle: string | FileSystemDirectoryHandle;

  name: string;
  lastSaved: number;

  valid: boolean;
}

export interface SaveGame {
  handle: string | FileSystemDirectoryHandle | null;

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

export type Handle = string | FileSystemDirectoryHandle;

const _save = writable<SaveGame | null>(null);
let unsubscribeFromLast: () => void;
export const save = {
  subscribe: _save.subscribe,
  set(save: SaveGame): void {
    if (typeof save.handle === "string" && typeof backend !== "undefined") {
      unsubscribeFromLast?.();

      backend.watchSaveFile(save.handle).then((store) =>
        store.subscribe(async (file) => {
          const data = new DOMParser().parseFromString(file.trim(), "text/xml");
          if (isValidSaveFile(data)) {
            const newSave = await processSaveFile({
              handle: save.handle!,
              data,
            });
            localForage.setItem("lastSaveFile", newSave);
            _save.set(newSave);
          }
        })
      ).then((unsubscriber) => unsubscribeFromLast = unsubscriber);
    } else {
      localForage.setItem("lastSaveFile", save);
      _save.set(save);
    }
  },
};

export function isValidSaveFile(
  file: XMLDocument,
): boolean {
  const farmer = file.querySelector("Farmer") ??
    file.querySelector("SaveGame > player");

  if (farmer === null) return false;

  return farmer.querySelector("name") !== null &&
    farmer.querySelector("cookingRecipes") !== null &&
    farmer.querySelector("craftingRecipes") !== null &&
    farmer.querySelector("basicShipped") !== null &&
    farmer.querySelector("mineralsFound") !== null &&
    farmer.querySelector("recipesCooked") !== null &&
    farmer.querySelector("archaeologyFound") !== null &&
    farmer.querySelector("fishCaught") !== null &&
    farmer.querySelector("friendshipData") !== null &&
    farmer.querySelector("dayOfMonthForSaveGame") !== null &&
    farmer.querySelector("seasonForSaveGame") !== null &&
    farmer.querySelector("yearForSaveGame") !== null &&
    farmer.querySelector("saveTime") !== null;
}

function getSaveFileData(
  file: { handle: Handle; data: XMLDocument } | XMLDocument,
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
  const save = (file instanceof XMLDocument ? file : file.data)
    .querySelector("SaveGame");
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
        file instanceof XMLDocument
          ? save.querySelector("name")?.textContent?.trim()
          : typeof file.handle === "string"
          ? file.handle
          : file.handle.name
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
  file: XMLDocument | { handle: Handle; data: XMLDocument },
): Promise<SaveGame> {
  const data = getSaveFileData(file);

  const currentDay = parseInt(data.currentDay.textContent!, 10);
  const currentSeason = parseInt(data.currentSeason.textContent!, 10);

  const gameInfo = await _gameInfo.fetch();

  const errorMessage = `Invalid save file ${
    file instanceof XMLDocument
      ? data.name.textContent?.trim()
      : typeof file.handle === "string"
      ? file.handle
      : file.handle.name
  }`;

  return {
    handle: file instanceof XMLDocument ? null : file.handle,
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
            assertQuerySelector(item, "key", errorMessage).textContent! in
              gameInfo.recipes
          )
          .map((item) =>
            gameInfo
              .recipes[
              assertQuerySelector(item, "key", errorMessage).textContent!
            ].result.id
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

          const villager = gameInfo.villagers[name];

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

export async function getSaveInfo(handle: Handle): Promise<SaveInfo> {
  const file = new DOMParser().parseFromString(
    await (typeof handle === "string"
      ? backend.getSaveInfo(handle)
      : handle.getFileHandle("SaveGameInfo")
        .then((handle) => handle.getFile())
        .then((file) => file.text()))
      .then((doc) => doc.trim()),
    "text/xml",
  );

  return {
    handle,

    name: file.querySelector("Farmer > name")!.textContent!.trim(),
    lastSaved: parseInt(
      file.querySelector("Farmer > saveTime")!.textContent!.trim(),
    ),

    valid: isValidSaveFile(file),
  };
}

export async function getSaveFile(handle: Handle): Promise<SaveGame> {
  return processSaveFile({
    handle,
    data: new DOMParser().parseFromString(
      await (typeof handle === "string"
        ? backend.getSaveFile(handle)
        : handle.getFileHandle(handle.name)
          .then((handle) => handle.getFile())
          .then((file) => file.text()))
        .then((doc) => doc.trim()),
      "text/xml",
    ),
  });
}

function isDirectory(
  handle: FileSystemHandle,
): handle is FileSystemDirectoryHandle {
  return handle.kind === "directory";
}

export async function getSaveFiles(
  dir?: string | FileSystemDirectoryHandle,
): Promise<SaveInfo[]> {
  let saves: SaveInfo[] = [];
  if (
    typeof backend !== "undefined" &&
    (typeof dir === "string" || typeof dir === "undefined")
  ) {
    if (typeof dir !== "undefined") backend.setSavesDir(dir);
    saves = await backend.listSaveFiles().then((saves) =>
      Promise.all(saves.map(getSaveInfo))
    );
  } else if (
    typeof globalThis.showDirectoryPicker !== "undefined" &&
    typeof dir !== "string" && typeof dir !== "undefined"
  ) {
    for await (const save of dir.values()) {
      if (isDirectory(save)) {
        try {
          saves.push(await getSaveInfo(save));
        } catch {}
      }
    }
  } else {
    throw new Error(
      "Neither Electron backend nor Native Filesystem API available",
    );
  }

  return saves.filter((save) => save.valid);
}

// This doesn't technically exist, but Sapper replaces every occurence of process.browser with true or false depending if it's in the browser.
declare var process: { browser: boolean };
if (process.browser) {
  localForage.getItem<SaveGame>("lastSaveFile").then((saveGame) => {
    if (saveGame !== null) save.set(saveGame);
  });
}

export default save;
