/** 
 * Creates game-info.json
 * Run as `deno run --allow-read --allow-net --allow-write import.ts <path to stardew valley installation>/Content`
 */

import * as base64 from "https://deno.land/std@0.69.0/encoding/base64.ts";
import * as path from "https://deno.land/std@0.89.0/path/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.3-alpha2/deno-dom-wasm.ts";
import { Image } from "https://deno.land/x/imagescript@1.1.16/ImageScript.js";
import Wiki from "https://denopkg.com/Liamolucko/deno-mediawiki/wiki.ts";
import * as xnb from "https://denopkg.com/Liamolucko/deno-xnb/mod.ts";
import {
  DictionaryReader,
  Int32Reader,
  StringReader,
  Texture2DReader,
} from "https://denopkg.com/Liamolucko/deno-xnb/readers.ts";
import type {
  Bundle,
  Item,
  RawRecipe as Recipe,
  RawVillager as Villager,
} from "../src/game-info-types.ts";

//#region Constants
const useTitleItems = [
  "Honey (any)",
  "Wine (any)",
  "Juice (any)",
  "Roe (any)",
  "Strange Doll",
];

const specialCaseTitles = <Record<string, string>> {
  "126": "Strange Doll (green)",
  "127": "Strange Doll (yellow)",
  "180": "Brown Egg",
  "182": "Large Brown Egg",
  "242": "Dish o' The Sea",
  "390": "Stone",
  "438": "Large Goat Milk",
};

const baseIdMap = <Record<string, string>> {
  "Large Egg (white)": "174",
  "Egg (white)": "176",
  "Egg (brown)": "180",
  "Large Egg (brown)": "182",
  "Pickles (any)": "342",
  "Jelly (any)": "344",
};

const seasonIDs = <Record<string, number>> {
  "spring": 0,
  "summer": 1,
  "fall": 2,
  "winter": 3,
};
//#endregion Constants

//#region Files
if (Deno.args.length < 1) {
  throw new Error("Must provide path to Stardew Valley installation.");
}
const installation = Deno.args[0];

async function importGameFile<T>(
  filename: string,
  expect: xnb.Reader<T>,
): Promise<T> {
  const xnbPath = path.join(installation, filename);

  return xnb.unpack(await Deno.readFile(xnbPath), expect).content;
}

async function importGameJson(
  filename: string,
): Promise<Record<string, string[]>> {
  let data: Map<string | number, string>;
  try {
    data = await importGameFile(
      filename,
      new DictionaryReader(StringReader, StringReader),
    );
  } catch {
    data = await importGameFile(
      filename,
      new DictionaryReader(Int32Reader, StringReader),
    );
  }

  return Object.fromEntries(
    Array.from(data.entries())
      .map(([key, value]) => [key, value.split("/")]),
  );
}

async function importGameImage(filename: string) {
  const texture = await importGameFile(filename, Texture2DReader);
  const image = new Image(texture.width, texture.height);
  image.bitmap.set(texture.data);
  return image;
}

const data = {
  objects: await importGameJson("Data/ObjectInformation.xnb"),
  craftables: await importGameJson("Data/BigCraftablesInformation.xnb"),

  bundles: await importGameJson("Data/Bundles.xnb"),
  fish: await importGameJson("Data/Fish.xnb"),
  monsters: await importGameJson("Data/Monsters.xnb"),
  npcDispositions: await importGameJson("Data/NPCDispositions.xnb"),
  npcGiftTastes: await importGameJson("Data/NPCGiftTastes.xnb"),
  cookingRecipes: await importGameJson("Data/CookingRecipes.xnb"),
  craftingRecipes: await importGameJson("Data/CraftingRecipes.xnb"),

  objectSpritesheet: await importGameImage("Maps/springobjects.xnb"),
  craftableSpritesheet: await importGameImage("TileSheets/Craftables.xnb"),
};

const monsterDrops = <Record<string, Record<string, number>>> {};
for (const [name, dropDictText] of Object.entries(data.monsters)) {
  const drops = parseDictText(dropDictText[6]);
  for (const [id, chance] of Object.entries(drops)) {
    monsterDrops[id] = { ...monsterDrops[id], [name]: chance };
  }
}

const cookingRecipes = Object.fromEntries(
  Object.entries(await importGameJson("Data/CookingRecipes.xnb"))
    .map(([name, row]) => [row[2].split(" ")[0], [name, ...row]]),
);
const craftingRecipes = Object.fromEntries(
  Object.entries(data.craftingRecipes)
    .map(([name, row]) => [row[2].split(" ")[0], [name, ...row]]),
);
//#endregion Files

const idMap = <Record<string, string>> {
  ...baseIdMap,
  ...Object.fromEntries(
    Object.entries(data.objects)
      .map(([id, data]) => [data[0], id]),
  ),
  ...Object.fromEntries(
    Object.entries(data.craftables)
      .map(([id, data]) => [data[0], "c" + id]),
  ),
  ...Object.fromEntries(
    Object.entries(specialCaseTitles)
      .map(([key, value]) => [value, key]),
  ),
};

const wiki = new Wiki("https://stardewvalleywiki.com/mediawiki/api.php/");

//#region Sprites
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Manual crop of RGBA data, since I couldn't find any libraries for it. */
function crop<
  T extends {
    data: Uint8Array;
    width: number;
    height: number;
    channels?: number;
  },
>(image: T, area: Rect): T {
  image.channels = image.channels ?? 4;
  const data = new Uint8Array(area.width * area.height * image.channels);

  const left = area.x * image.channels;
  const right = (area.x + area.width) * image.channels;
  const width = area.width * image.channels;

  for (let line = 0; line < area.height; line++) {
    data.set(
      image.data.slice(
        (line + area.y) * image.width * image.channels + left,
        (line + area.y) * image.width * image.channels + right,
      ),
      line * width,
    );
  }

  return {
    ...image,
    data,
    width: area.width,
    height: area.height,
  };
}

async function getSprite(id: string) {
  const craftable = id.startsWith("c");
  const intId = parseInt(id.replace("c", ""));

  const image = (craftable ? data.craftableSpritesheet : data.objectSpritesheet)
    .clone()
    .crop(
      intId % (craftable ? 8 : 24) * 16,
      Math.floor(intId / (craftable ? 8 : 24)) * (craftable ? 32 : 16),
      16,
      craftable ? 32 : 16,
    );

  return base64.encode(await image.encode(3));
}
//#endregion Sprites

//#region Collecting info
function chunks<T>(list: T[], n: number) {
  const out = [];
  for (let i = 0; i < list.length; i += n) {
    out.push(list.slice(i, i + n));
  }
  return out;
}

/** Convert string structured as 'key value key value...' to dict */
function parseDictText(text: string) {
  if (text.length === 0) return {};

  return Object.fromEntries(
    chunks(text.split(" "), 2)
      .map(([key, value]) => [key, parseFloat(value)]),
  );
}

function formatTime(time: number) {
  const hour = ((time % 1200) + (time % 1200 === 0 ? 1200 : 0)).toString();
  const half = Math.floor(time / 1200) % 2 === 0 ? "AM" : "PM";

  return `${hour.slice(0, -2)}:${hour.slice(-2)}${half}`;
}

const argSplitter = /\|(?!(?<=(?:{{|\[\[).*).*(?:}}|]]))/g;
const infoboxRegex = /{{[^{}]*Infobox/;
const templateEndingRegex = /{{|}}/g;
const templateKeyDivider = /=(?!(?<=(?:{{|\[\[|<).*).*(?:}}|]]|>))/;
function parseInfobox(
  wikitext: string,
): Record<string | number, string> | null {
  if (!infoboxRegex.test(wikitext)) return null;

  let start = 1;
  let depth = 0;
  for (const match of wikitext.matchAll(templateEndingRegex)) {
    if (start === -1) start = match.index ?? start;

    switch (match[0]) {
      case "{{":
        depth++;
        break;
      case "}}":
        depth--;
        break;
    }

    if (depth === 0) {
      return Object.fromEntries(
        wikitext
          .slice(start, match.index! + match.length)
          .trim()
          .slice(2, -2)
          .split(argSplitter)
          .slice(1)
          .map((arg, i) =>
            templateKeyDivider.test(arg)
              ? arg.split(templateKeyDivider).map((e) => e.trim())
              : [i, arg]
          ),
      );
    }

    if (depth < 0) return null;
  }

  return null;
}

async function getRawText(wikitext: string): Promise<string> {
  try {
    return new DOMParser().parseFromString(
      (
        await fetch(`${wiki.apiUrl}?${
          new URLSearchParams({
            "format": "json",
            "formatversion": "2",
            "action": "parse",
            "text": wikitext,
            "prop": "text",
          }).toString()
        }`).then((response) => response.json())
      ).parse.text,
      "text/html",
    )!.textContent.trim()
      .replaceAll(/  +/g, " ")
      .replaceAll(/<.+?>/g, "")
      .replaceAll("\n\n\n", ": ");
  } catch {
    // retry
    return getRawText(wikitext);
  }
}

const listSplitRegex =
  /(?<=}}) ?(?=\[\[)|(?:(?<=]]|}}) ?|(?<=\)) )(?={{)| (?:•|&bull;) |(?<!^)(?<!>)<\/?[^\[\]{\}\/]+(?:\/>(?!\()|>)(?!<)(?!$)|\n/g;
function parseList(wikitext: string) {
  return Promise.all(wikitext.trim().split(listSplitRegex).map(getRawText));
}

async function getItemInfo(id: string): Promise<Item> {
  const craftable = id.startsWith("c");
  const baseId = craftable ? id.slice(1) : id;
  const row = craftable ? data.craftables[id.slice(1)] : data.objects[id];

  const item: Item = {
    id,
    craftable,
    name: row[0],
    category: row[3],
    description: row[craftable ? 4 : 5],
    sprite: await getSprite(id),
  };

  if (item.category === "Arch") {
    item.artifactSpots = parseDictText(row[6]);
  } else if (item.category === "Fish -4") {
    if (data.fish[id][1] === "trap") {
      item.water = data.fish[id][4];
    } else {
      item.time = data.fish[id][5]
        .split(" ")
        .map((time) => formatTime(parseInt(time)))
        .join(" – ");

      item.weather = data.fish[id][7];
    }
  }

  if (id in cookingRecipes) {
    item.ingredients = parseDictText(cookingRecipes[id][1]);
  } else if (
    baseId in craftingRecipes &&
    (craftingRecipes[baseId][4] === "true") === item.craftable
  ) {
    item.ingredients = parseDictText(craftingRecipes[baseId][1]);
  }

  if (id in monsterDrops && !item.craftable) {
    item.monsterDrops = monsterDrops[id];
  }

  async function fetchFromWiki() {
    try {
      const title = specialCaseTitles[item.id] ?? item.name;
      const page = await wiki.page(title);

      item.url = `https://stardewvalleywiki.com/${page.key}`;

      const infobox = parseInfobox(page.source);

      if (infobox !== null) {
        item.sources = [];
        if ("source" in infobox || "os" in infobox) {
          item.sources = (await parseList(infobox.source ?? infobox.os))
            .filter((source) =>
              source !== "Artisan Goods" &&
              !Object.keys(item.monsterDrops ?? {})
                .some((monster) => source.includes(monster))
            );
        }

        if ("craftingstation" in infobox) {
          item.sources.push(await getRawText(infobox.craftingstation));
        }

        if (item.sources.length === 0) delete item.sources;

        if ("location" in infobox) {
          item.locations = await parseList(infobox.location);
        }

        if ("season" in infobox) {
          const seasons = infobox.season.toLowerCase();
          item.seasons = {
            spring: seasons.includes("spring"),
            summer: seasons.includes("summer"),
            fall: seasons.includes("fall"),
            winter: seasons.includes("winter"),
          };

          if (
            !item.seasons.spring && !item.seasons.summer &&
            !item.seasons.fall && !item.seasons.winter
          ) {
            item.seasons = {
              spring: true,
              summer: true,
              fall: true,
              winter: true,
            };
          }
        }

        if ("recipe" in infobox) {
          item.recipeSources = (await parseList(
            infobox.recipe
              .replace("[[File:HeartIconLarge.png|16px|link=]]", "❤"),
          )).filter((source) => source !== "Starter");
          if (item.recipeSources.length === 0) delete item.recipeSources;
        }
      }
    } catch (e) {
      if (e.name === "Http") {
        // retry
        await fetchFromWiki();
      } else {
        console.warn(`Failed to fetch wiki page for ${item.name}`);
      }
    }
  }

  await fetchFromWiki();

  return item;
}

const items = Object.fromEntries(
  await Promise.all([
    ...Object.keys(data.objects),
    ...Object.keys(data.craftables).map((id) => "c" + id),
  ].map(getItemInfo)).then((items) => items.map((item) => [item.id, item])),
);

function getRecipeInfo(row: string[]): Recipe {
  const result = row[3].split(" ");
  const item = items[row[4] === "true" ? "c" + result[0] : result[0]];
  return {
    name: row[0],
    result: item.id,
    amount: result.length > 1 ? parseInt(result[1]) : 1,
    ingredients: parseDictText(row[1]),
    sources: item.recipeSources,
  };
}

const recipes = Object.fromEntries(
  [
    ...Object.values(craftingRecipes),
    ...Object.values(cookingRecipes),
  ].map(getRecipeInfo).map((recipe) => [recipe.name, recipe]),
);

function getVillagerInfo(name: string): Villager | false {
  const disposition = data.npcDispositions[name];
  const giftTaste = data.npcGiftTastes[name];

  if (disposition[8].length === 0) return false;

  return {
    name: disposition[11],
    datable: disposition[5] === "datable",
    bestGifts: giftTaste[1].split(" ").filter((item) => item in data.objects),
    birthday: disposition[8][0].toUpperCase() + disposition[8].slice(1),
    birthDate: seasonIDs[disposition[8].split(" ")[0]] * 28 +
      parseInt(disposition[8].split(" ")[1]),
  };
}

const villagers = Object.fromEntries(
  Object
    .keys(data.npcDispositions)
    .map(getVillagerInfo)
    .filter((villager): villager is Villager => villager !== false)
    .map((villager) => [villager.name, villager]),
);

const bundles = Object.entries(data.bundles).map(([id, row]): Bundle => ({
  name: row[0] + " Bundle",
  section: id.split("/")[0],
  id: parseInt(id.split("/")[1]),
  slots: row.length >= 5 ? parseInt(row[4]) : row[2].split(" ").length / 3,
  items: Array.from(chunks(row[2].split(" "), 3))
    .map(([id, count, quality]) => ({
      id,
      amount: parseInt(count),
      quality: parseInt(quality),
    }))
    .filter((item) => item.id !== "-1"),
  gold: row[2].startsWith("-1") ? parseInt(row[2].split(" ")[1]) : 0,
}));
//#endregion

//#region Collections
const collectionsList = new DOMParser()
  .parseFromString(await wiki.page("Collections").html, "text/html")!
  .getElementsByClassName("wikitable")
  .map((table) =>
    table.getElementsByTagName("a").map((link) =>
      idMap[
        useTitleItems.includes(link.textContent)
          ? link.attributes.title
          : link.textContent
      ]
    )
  );

const collections = {
  shipping: [
    ...collectionsList[0],
    ...collectionsList[1],
    ...collectionsList[2],
  ],
  fish: collectionsList[3],
  artifacts: collectionsList[4],
  minerals: collectionsList[5],
  cooking: collectionsList[6].map((id) => cookingRecipes[id][0]),
  crafting: Object.keys(data.craftingRecipes),
};
//#endregion Collections

const outPath = new URL("../src/game-info.json", import.meta.url);
await Deno.writeTextFile(
  outPath,
  JSON.stringify({
    ...collections,
    bundles,
    villagers,
    items,
    recipes,
  }),
);

console.log(
  `Successfully created ${outPath}.`,
);
