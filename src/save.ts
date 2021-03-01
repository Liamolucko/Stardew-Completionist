import { writable } from "svelte/store";
import backend from "./backend";
import gameInfo from "./game-info.js";
import { Image } from "imagescript";
import { seasonValues } from "./names";
import { createFarmerSprite } from "./sprite";
import Cookies from "universal-cookie";
import * as cborg from "cborg";
import * as base64 from "base64-js";

const cookies = new Cookies();

/** Metadata about a save file */
export interface SaveInfo {
  /** With the Electron backend, the save file ID. With the Native Filesystem API, the handle to the save file's directory.  */
  handle: string;

  name: string;
  lastSaved: number;

  sprite: string;
}

export interface SaveGame {
  handle: string | null;

  name: string;
  lastSaved: number;

  currentDay: number;
  currentSeason: number;
  currentYear: number;
  currentDate: number;

  collectedItems: string[];
  knownRecipes: string[];

  relationships: Record<string, Relationship>;

  bundleCompletion: Record<number, boolean[]>;
  items: Record<string, number>;
}

export interface Relationship {
  hearts: number;
  maxHearts: number;
  /** Gifts given this week. Shortened so saves will fit inside a cookie. */
  given: number;
}

export type Handle = string;

const cookieOptions = {
  secure: true,
  sameSite: "strict",
  expires: new Date(2038, 0),
} as const;

const _save = writable<SaveGame | null>(null);
let unsubscribeFromLast: () => void;
export const save = {
  subscribe: _save.subscribe,
  set(save: SaveGame | null): void {
    if (typeof save?.handle === "string" && typeof backend !== "undefined") {
      unsubscribeFromLast?.();

      backend.watchSaveFile(save.handle).then((store) =>
        store.subscribe(async (file) => {
          const data = new DOMParser().parseFromString(file.trim(), "text/xml");
          if (isValidSaveFile(data)) {
            const newSave = await processSaveFile({
              handle: save.handle!,
              data,
            });
            cookies.set(
              "save",
              base64.fromByteArray(cborg.encode(newSave)),
              cookieOptions,
            );
            _save.set(newSave);
          }
        })
      ).then((unsubscriber) => unsubscribeFromLast = unsubscriber);
    } else {
      cookies.set(
        "save",
        base64.fromByteArray(cborg.encode(save)),
        cookieOptions,
      );

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

export async function processSaveFile(
  file: XMLDocument | { handle: Handle; data: XMLDocument },
): Promise<SaveGame> {
  const save = (file instanceof XMLDocument ? file : file.data)
    .querySelector("SaveGame");
  if (save === null) throw new Error("Invalid save file");

  const errorMessage = `Invalid save file ${
    file instanceof XMLDocument
      ? save.querySelector("player > name")?.textContent?.trim() ?? ""
      : file.handle
  }`;

  const queryText = (selector: string, el = save) => {
    const contents = el.querySelector(selector)?.textContent?.trim();
    if (contents == null) {
      throw new Error(errorMessage);
    }
    return contents;
  };

  const queryNumber = (selector: string, el = save) =>
    parseInt(queryText(selector, el), 10);

  const queryAllNodes = (selector: string, el = save) =>
    Array.from(el.querySelectorAll(selector));

  const queryMapNodes = (selector: string, el = save) => {
    const items = queryAllNodes(`${selector} > item`, el);
    return items.map((item) => {
      const key = item.querySelector("key")?.textContent?.trim();
      const value = item.querySelector("value");
      if (key == null || value == null) {
        throw new Error(errorMessage);
      }
      return [key, value] as [string, Element];
    });
  };

  const queryMap = (selector: string, el = save) => {
    const items = queryAllNodes(`${selector} > item`, el);
    return Object.fromEntries(items.map((item) => {
      const key = item.querySelector("key")?.textContent?.trim();
      const value = item.querySelector("value")?.textContent?.trim();
      if (key == null || value == null) {
        throw new Error(errorMessage);
      }
      return [key, value];
    }));
  };

  const findNode = (selector: string, predicate: (el: Element) => boolean) => {
    const node = queryAllNodes(selector).find(predicate);
    if (node == null) {
      throw new Error(errorMessage);
    }
    return node;
  };

  const currentDay = queryNumber("dayOfMonth");
  const currentSeason = seasonValues.get(queryText("currentSeason")) ?? 0;

  return {
    handle: file instanceof XMLDocument ? null : file.handle,
    name: queryText("player > name"),
    lastSaved: queryNumber("player > saveTime"),

    currentDay,
    currentSeason,
    currentYear: queryNumber("year"),
    currentDate: currentSeason * 28 + currentDay,

    collectedItems: [
      ...Object.keys(queryMap("player > basicShipped")),
      ...Object.keys(queryMap("player > mineralsFound")),
      ...Object.keys(queryMap("player > recipesCooked")),
      ...Object.keys(queryMap("player > archaeologyFound")),
      ...Object.keys(queryMap("player > fishCaught")),
      ...Object.entries(queryMap("player > craftingRecipes"))
        .filter(([key, value]) =>
          parseInt(value) > 0 && key in gameInfo.recipes
        )
        .map(([key]) => gameInfo.recipes[key].result.id),
    ],

    knownRecipes: [
      ...Object.keys(queryMap("player > cookingRecipes")),
      ...Object.keys(queryMap("player > craftingRecipes")),
    ],

    relationships: Object.fromEntries(
      queryMapNodes("player > friendshipData")
        .map(([key, value]) => {
          const villager = gameInfo.villagers[key];

          if (villager) {
            return [key, {
              hearts: queryNumber("Friendship > Points", value) / 250,
              maxHearts: queryText("Friendship > Status", value) === "Married"
                ? 14
                : villager.datable
                ? 8
                : 10,
              given: queryNumber("Friendship > GiftsThisWeek", value),
            }] as [string, Relationship];
          }
        })
        .filter((item): item is [string, Relationship] => item != null),
    ),

    bundleCompletion: Object.fromEntries(
      queryMapNodes(
        "bundles",
        findNode(
          "locations > GameLocation",
          (el) => el.getAttribute("xsi:type") == "CommunityCenter",
        ),
      ).map(([key, value]) => [
        parseInt(key),
        queryAllNodes("ArrayOfBoolean > boolean", value)
          .map((el) => el.textContent == "true")
          .filter((_, i) =>
            i < gameInfo.bundles[parseInt(key)]?.items.length ?? Infinity
          ),
      ]),
    ),

    items: queryAllNodes(
      "locations > GameLocation > objects > item > value > Object",
    )
      .filter((el) => el.querySelector("items"))
      .flatMap((el) => Array.from(el.querySelectorAll("items > Item")))
      .filter((el) => el.getAttribute("xsi:type") == "Object")
      .reduce<Record<string, number>>((acc, el) => {
        const isCraftable =
          el.querySelector("bigCraftable")?.textContent === "true";
        const id = (isCraftable ? "c" : "") +
          queryText("parentSheetIndex", el);

        acc[id] ??= 0;
        acc[id] += queryNumber("stack", el);

        return acc;
      }, {}),
  };
}

export async function getSaveInfo(handle: Handle): Promise<SaveInfo> {
  const file = new DOMParser().parseFromString(
    await backend.getSaveInfo(handle)
      .then((doc) => doc.trim()),
    "text/xml",
  );

  const errorMessage = `Invalid save file ${handle}`;

  function queryText(selector: string) {
    const contents = file.querySelector(selector)?.textContent?.trim();
    if (!contents) {
      throw new Error(errorMessage);
    }
    return contents;
  }

  function queryNumber(selector: string) {
    return parseInt(queryText(selector), 10);
  }

  function queryColor(selector: string) {
    return Image.rgbaToColor(
      queryNumber(`${selector} > R`),
      queryNumber(`${selector} > G`),
      queryNumber(`${selector} > B`),
      queryNumber(`${selector} > A`),
    );
  }

  const hatStr = file.querySelector("Farmer > hat > which")?.textContent;
  const hat = hatStr != null ? parseInt(hatStr) : null;

  return {
    handle,

    name: queryText("Farmer > name"),
    lastSaved: queryNumber("Farmer > saveTime"),

    sprite: await createFarmerSprite({
      shirt: queryNumber("Farmer > shirtItem > indexInTileSheet"),
      hair: queryNumber("Farmer > hair"),
      skin: queryNumber("Farmer > skin"),
      shoes: queryNumber("Farmer > shoes"),
      accessory: queryNumber("Farmer > accessory"),
      facialHair: queryNumber("Farmer > facialHair"),
      pants: queryNumber("Farmer > pantsItem > indexInTileSheet"),
      hairColor: queryColor("Farmer > hairstyleColor"),
      pantsColor: queryColor("Farmer > pantsColor"),
      eyeColor: queryColor("Farmer > newEyeColor"),
      hat,
      isMale: queryText("Farmer > isMale") === "true",
    }),
  };
}

export async function getSaveFile(handle: Handle): Promise<SaveGame> {
  return processSaveFile({
    handle,
    data: new DOMParser().parseFromString(
      await backend.getSaveFile(handle)
        .then((doc) => doc.trim()),
      "text/xml",
    ),
  });
}

export async function getSaveFiles(
  dir?: string,
): Promise<SaveInfo[]> {
  if (typeof dir !== "undefined") backend.setSavesDir(dir);

  const saves = await backend.listSaveFiles().then((saves) =>
    Promise.all(saves.map((save) => getSaveInfo(save).catch(() => null)))
  );

  return saves.filter((save): save is SaveInfo => save != null);
}

export default save;
