import { Image } from "imagescript";
import * as base64 from "base64-js";

export type Appearance = {
  shirt: number;
  hair: number;
  skin: number;
  shoes: number;
  accessory: number;
  facialHair: number;
  pants: number;
  hairColor: number;
  pantsColor: number;
  eyeColor: number;
  hat: number | null;
  isMale: boolean;
};

const spritesheetCache = new Map<string, Image>();

async function fetchSpritesheet(name: string) {
  const cached = spritesheetCache.get(name);
  if (cached) return cached.clone();
  const response = await fetch(`./farmer-spritesheets/${name}.png`);
  const img = await Image.decode(new Uint8Array(await response.arrayBuffer()));
  spritesheetCache.set(name, img);
  return img.clone();
}

function* iterateWithColors(image: Image) {
  // This function isn't annotated properly, so I have to tell typescript what it is.
  yield* image.iterateWithColors() as unknown as Iterable<
    [x: number, y: number, color: number]
  >;
}

export async function createFarmerSprite(
  appr: Appearance,
) {
  const output = new Image(20, 34);
  const spriteRoot = "farmer" + (appr.isMale ? "" : "_girl");
  const base = await fetchSpritesheet(
    `${spriteRoot}_base${appr.hair > 48 ? "_bald" : ""}`,
  );

  const skinColors = await fetchSpritesheet("skinColors");

  const oldSkin = [
    skinColors.getPixelAt(1, 1),
    skinColors.getPixelAt(2, 1),
    skinColors.getPixelAt(3, 1),
  ];
  const newSkin = [
    skinColors.getPixelAt(1, appr.skin + 1),
    skinColors.getPixelAt(2, appr.skin + 1),
    skinColors.getPixelAt(3, appr.skin + 1),
  ];

  for (const [x, y, color] of iterateWithColors(base)) {
    if (color === oldSkin[0]) {
      base.setPixelAt(x, y, newSkin[0]);
    } else if (color === oldSkin[1]) {
      base.setPixelAt(x, y, newSkin[1]);
    } else if (color === oldSkin[2]) {
      base.setPixelAt(x, y, newSkin[2]);
    } else if (color === 0x682b0fff) {
      base.setPixelAt(x, y, appr.eyeColor);
    }
  }

  output.composite(base, 2, 2);

  const shirtSheet = await fetchSpritesheet("shirts");
  const shirt = shirtSheet.crop(
    appr.shirt % 16 * 8,
    Math.floor(appr.shirt / 16) * 32,
    8,
    8,
  );
  output.composite(shirt, 6, 17);

  const pantsSheet = await fetchSpritesheet("pants");
  const pants = pantsSheet.crop(appr.pants * 192, 0, 16, 32);
  const pantsColor = Image.colorToRGBA(appr.pantsColor);
  pants.red(pantsColor[0] / 255);
  pants.green(pantsColor[1] / 255);
  pants.blue(pantsColor[2] / 255);
  pants.opacity(pantsColor[3] / 255);
  output.composite(pants, 2, 2);

  const arms = await fetchSpritesheet(`${spriteRoot}_arms`);
  for (const [x, y, color] of iterateWithColors(arms)) {
    if (color === oldSkin[0]) {
      arms.setPixelAt(x, y, newSkin[0]);
    } else if (color === oldSkin[1]) {
      arms.setPixelAt(x, y, newSkin[1]);
    } else if (color === oldSkin[2]) {
      arms.setPixelAt(x, y, newSkin[2]);
    }
  }
  output.composite(arms, 2, 2);

  const accessorySheet = await fetchSpritesheet("accessories");
  const accessory = accessorySheet.crop(
    appr.accessory % 8 * 16,
    Math.floor(appr.accessory / 8) * 32,
    16,
    16,
  );
  const hairColor = Image.colorToRGBA(appr.hairColor);
  if (appr.accessory < 6) {
    accessory.red(hairColor[0] / 255);
    accessory.green(hairColor[1] / 255);
    accessory.blue(hairColor[2] / 255);
    accessory.opacity(hairColor[3] / 255);
  }
  output.composite(accessory, 2, 4);

  if (appr.hat != null) {
    const hatSheet = await fetchSpritesheet("hats");
    const hat = hatSheet.crop(
      appr.hat % 12 * 20,
      Math.floor(appr.hat / 12) * 80,
      20,
      20,
    );
    output.composite(hat, 0, 0);
  } else {
    const hairSheet = await fetchSpritesheet("hairstyles");
    const hair = hairSheet.crop(
      appr.hair % 8 * 16,
      Math.floor(appr.hair / 8) * 96,
      16,
      32,
    );
    hair.red(hairColor[0] / 255);
    hair.green(hairColor[1] / 255);
    hair.blue(hairColor[2] / 255);
    hair.opacity(hairColor[3] / 255);
    output.composite(hair, 2, 3);
  }

  return "data:image/png;base64," + base64.fromByteArray(await output.encode());
}
