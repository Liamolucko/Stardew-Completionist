import Jimp from "./jimp";

export type Color = [number, number, number, number];

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

function fetchSpritesheet(name: string) {
  return Jimp.read(`/farmer-spritesheets/${name}.png`);
}

// function setPixel(img: png.IDecodedPNG, x: number, y: number, val: Color) {
//   const idx = y * 4 * img.width + x * 4;
//   img.data[idx] = val[0];
//   img.data[idx + 1] = val[1];
//   img.data[idx + 2] = val[2];
//   img.data[idx + 3] = val[3];
// }

// function mapPixels(img: png.IDecodedPNG, cb: (pixel: Color) => Color) {
//   for (let x = 0; x < img.width; x++) {
//     for (let y = 0; y < img.height; y++) {
//       setPixel(img, x, y, cb(getPixel(img, x, y)));
//     }
//   }
// }

// function equals(left: Color, right: Color) {
//   return left[0] === right[0] && left[1] === right[1] && left[2] === right[2] &&
//     left[3] === right[3];
// }

// function getPixel(img: png.IDecodedPNG, x: number, y: number): Color {
//   const idx = y * 4 * img.width + x * 4;
//   return [
//     img.data[idx],
//     img.data[idx + 1],
//     img.data[idx + 2],
//     img.data[idx + 3],
//   ];
// }

// function addImage(
//   img: png.IDecodedPNG,
//   other: png.IDecodedPNG,
//   x: number,
//   y: number,
// ) {
//   for (let xPos = 0; xPos < other.width; xPos++) {
//     for (let yPos = 0; yPos < other.height; yPos++) {
//       const pixel = getPixel(other, xPos, yPos);
//       const existing = getPixel(img, xPos + x, yPos + y);
//       const newAlpha = existing[3] + (1 - existing[3]) * pixel[3];
//       setPixel(img, xPos + x, yPos + y, [
//         (existing[3] * existing[0] + (1 - existing[3]) * pixel[3] * pixel[0]) /
//         newAlpha,
//         (existing[3] * existing[1] + (1 - existing[3]) * pixel[3] * pixel[1]) /
//         newAlpha,
//         (existing[3] * existing[2] + (1 - existing[3]) * pixel[3] * pixel[2]) /
//         newAlpha,
//         newAlpha,
//       ]);
//     }
//   }
// }

// function crop(
//   image: png.IDecodedPNG,
//   area: { x: number; y: number; width: number; height: number },
// ): png.IDecodedPNG {
//   const data = new Uint8Array(area.width * area.height * 4);

//   const left = area.x * 4;
//   const right = (area.x + area.width) * 4;
//   const width = area.width * 4;

//   for (let line = 0; line < area.height; line++) {
//     data.set(
//       image.data.slice(
//         (line + area.y) * image.width * 4 + left,
//         (line + area.y) * image.width * 4 + right,
//       ),
//       line * width,
//     );
//   }

//   return {
//     ...image,
//     data,
//     width: area.width,
//     height: area.height,
//   };
// }

// export async function createFarmerSprite(
//   appr: Appearance,
// ) {
//   const output: png.IDecodedPNG = {
//     width: 20,
//     height: 34,
//     channels: 4,
//     data: new Uint8Array(20 * 34 * 4),
//     depth: 8,
//     text: {},
//   };

//   const spriteRoot = "farmer" + (appr.isMale ? "" : "_girl");
//   const base = await fetchSpritesheet(
//     `${spriteRoot}_base${appr.hair > 48 ? "_bald" : ""}`,
//   );
//   const skinColors = await fetchSpritesheet("skinColors");

//   const oldSkin = [
//     getPixel(skinColors, 0, 0),
//     getPixel(skinColors, 1, 0),
//     getPixel(skinColors, 2, 0),
//   ];
//   const newSkin = [
//     getPixel(skinColors, 0, appr.skin),
//     getPixel(skinColors, 1, appr.skin),
//     getPixel(skinColors, 2, appr.skin),
//   ];

//   mapPixels(base, (pixel) => {
//     if (equals(pixel, oldSkin[0])) {
//       return newSkin[0];
//     } else if (equals(pixel, oldSkin[1])) {
//       return newSkin[1];
//     } else if (equals(pixel, oldSkin[2])) {
//       return newSkin[2];
//     } else if (equals(pixel, [104, 43, 15, 255])) {
//       return appr.eyeColor;
//     } else {
//       return pixel;
//     }
//   });

//   addImage(output, base, 2, 2);

//   const shirtSheet = await fetchSpritesheet("shirts");
//   const shirt = crop(shirtSheet, {
//     x: appr.shirt % 16 * 8,
//     y: Math.floor(appr.shirt / 16) * 32,
//     width: 8,
//     height: 8,
//   });
//   addImage(output, shirt, 6, 17);

//   const pantsSheet = await fetchSpritesheet("pants");
//   const pants = crop(pantsSheet, {
//     x: appr.pants * 192,
//     y: 0,
//     width: 16,
//     height: 32,
//   });
//   mapPixels(pants, (pixel) => [
//     pixel[0] * appr.pantsColor[0] / 255,
//     pixel[1] * appr.pantsColor[1] / 255,
//     pixel[2] * appr.pantsColor[2] / 255,
//     pixel[3] * appr.pantsColor[3] / 255,
//   ]);
//   addImage(output, pants, 2, 2);

//   const arms = await fetchSpritesheet(`${spriteRoot}_arms`);
//   mapPixels(arms, (pixel) => {
//     if (equals(pixel, oldSkin[0])) {
//       return newSkin[0];
//     } else if (equals(pixel, oldSkin[1])) {
//       return newSkin[1];
//     } else if (equals(pixel, oldSkin[2])) {
//       return newSkin[2];
//     } else {
//       return pixel;
//     }
//   });
//   addImage(output, arms, 2, 2);

//   const accessories = await fetchSpritesheet("accessories");
//   const accessory = crop(accessories, {
//     x: appr.accessory % 8 * 16,
//     y: Math.floor(appr.accessory / 8) * 32,
//     width: 16,
//     height: 16,
//   });
//   if (appr.accessory < 6) {
//     mapPixels(accessory, (pixel) => [
//       pixel[0] * appr.hairColor[0] / 255,
//       pixel[1] * appr.hairColor[1] / 255,
//       pixel[2] * appr.hairColor[2] / 255,
//       pixel[3] * appr.hairColor[3] / 255,
//     ]);
//   }
//   addImage(output, accessory, 2, 4);

//   return png.encode(output);
// }

export async function createFarmerSprite(
  appr: Appearance,
) {
  const output = new Jimp(20, 34);
  const spriteRoot = "farmer" + (appr.isMale ? "" : "_girl");
  const base = await fetchSpritesheet(
    `${spriteRoot}_base${appr.hair > 48 ? "_bald" : ""}`,
  );

  const skinColors = await fetchSpritesheet("skinColors");

  const oldSkin = [
    skinColors.getPixelColor(0, 0),
    skinColors.getPixelColor(1, 0),
    skinColors.getPixelColor(2, 0),
  ];
  const newSkin = [
    skinColors.getPixelColor(0, appr.skin),
    skinColors.getPixelColor(1, appr.skin),
    skinColors.getPixelColor(2, appr.skin),
  ];

  base.scan(0, 0, base.getWidth(), base.getHeight(), (x, y) => {
    if (base.getPixelColor(x, y) === oldSkin[0]) {
      base.setPixelColor(newSkin[0], x, y);
    } else if (base.getPixelColor(x, y) === oldSkin[1]) {
      base.setPixelColor(newSkin[1], x, y);
    } else if (base.getPixelColor(x, y) === oldSkin[2]) {
      base.setPixelColor(newSkin[2], x, y);
    } else if (base.getPixelColor(x, y) === 0x682b0fff) {
      base.setPixelColor(appr.eyeColor, x, y);
    }
  });

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
  const pantsColor = Jimp.intToRGBA(appr.pantsColor);
  pants.scan(0, 0, pants.getWidth(), pants.getHeight(), (x, y) => {
    const color = Jimp.intToRGBA(pants.getPixelColor(x, y));
    color.r *= pantsColor.r / 255;
    color.g *= pantsColor.g / 255;
    color.b *= pantsColor.b / 255;
    color.a *= pantsColor.a / 255;
    pants.setPixelColor(
      Jimp.rgbaToInt(color.r, color.g, color.b, color.a),
      x,
      y,
    );
  });
  output.composite(pants, 2, 2);

  const arms = await fetchSpritesheet(`${spriteRoot}_arms`);
  arms.scan(0, 0, arms.getWidth(), arms.getHeight(), (x, y) => {
    if (arms.getPixelColor(x, y) === oldSkin[0]) {
      arms.setPixelColor(newSkin[0], x, y);
    } else if (arms.getPixelColor(x, y) === oldSkin[1]) {
      arms.setPixelColor(newSkin[1], x, y);
    } else if (arms.getPixelColor(x, y) === oldSkin[2]) {
      arms.setPixelColor(newSkin[2], x, y);
    }
  });
  output.composite(arms, 2, 2);

  const accessorySheet = await fetchSpritesheet("accessories");
  const accessory = accessorySheet.crop(
    appr.accessory % 8 * 16,
    Math.floor(appr.accessory / 8) * 32,
    16,
    16,
  );
  const hairColor = Jimp.intToRGBA(appr.hairColor);
  if (appr.accessory < 6) {
    accessory.scan(
      0,
      0,
      accessory.getWidth(),
      accessory.getHeight(),
      (x, y) => {
        const color = Jimp.intToRGBA(accessory.getPixelColor(x, y));
        color.r *= hairColor.r / 255;
        color.g *= hairColor.g / 255;
        color.b *= hairColor.b / 255;
        color.a *= hairColor.a / 255;
        accessory.setPixelColor(
          Jimp.rgbaToInt(color.r, color.g, color.b, color.a),
          x,
          y,
        );
      },
    );
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
    hair.scan(0, 0, hair.getWidth(), hair.getHeight(), (x, y) => {
      const color = Jimp.intToRGBA(hair.getPixelColor(x, y));
      color.r *= hairColor.r / 255;
      color.g *= hairColor.g / 255;
      color.b *= hairColor.b / 255;
      color.a *= hairColor.a / 255;
      hair.setPixelColor(
        Jimp.rgbaToInt(color.r, color.g, color.b, color.a),
        x,
        y,
      );
    });
    output.composite(hair, 2, 3);
  }

  return await output.getBase64Async("image/png");
}
