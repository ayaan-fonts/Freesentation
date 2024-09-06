// == Code from @orioncactus/pretendard/packages/subset-utils ==
// == Copyright 2023 by Orioncactus & Black7345 ==

import { basename, extname, join } from "node:path";
import { mkdir, access, rm } from "fs/promises";
import { fontPipe, FontPipeI } from "font-range";

// == Types ===================================================================
export interface ISubsets<T> {
  (kinds: TSubsetKinds, format: Tformat, fontList: IFontInfo): T;
}
export interface IFontInfo {
  family: FONTFAMILY;
  fontList: string[];
}

export type Tformat = "woff" | "woff2";
export type TPathKinds = "Static";
export type TSubsetKinds = "static" | "glyph" | "dynamic";

// == Constants ===============================================================
const STATIC_PATH = join(process.cwd(), "..", "..", "fonts", "truetype");
const STATIC_OUTPUT_PATH = join(process.cwd(), "..", "..", "fonts", "webfonts");

export enum FONTFAMILY {
  Freesentation = "Freesentation",
}

const FONTWEIGHTS = [
  "9Black",
  "8ExtraBold",
  "7Bold",
  "6SemiBold",
  "5Medium",
  "4Regular",
  "3Light",
  "2ExtraLight",
  "1Thin",
];

// == Functions ===============================================================
export async function clearDir(outDir: string) {
  try {
    await access(outDir);
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir);
  } catch (err) {
    await mkdir(outDir);
  }
}

function getOutInfo(kinds: TSubsetKinds, format: Tformat) {
  switch (kinds) {
    case "static":
      return {
        outType: format,
        outName: "{NAME}{EXT}",
      };
    case "glyph":
      return {
        outType: `${format}-subset`,
        outName: "{NAME}.subset{EXT}",
      };
    case "dynamic":
      return {
        outType: `${format}-dynamic-subset`,
        outName: "{NAME}.subset.{INDEX}{EXT}",
      };
  }
}

async function createOption(
  kinds: TSubsetKinds,
  format: Tformat,
  fontInfo: IFontInfo
) {
  // Get Infos
  const { fontList } = fontInfo;

  const basePath = STATIC_PATH;
  const distPath = STATIC_OUTPUT_PATH;

  const { outType, outName } = getOutInfo(kinds, format);
  const outDir = join(distPath, outType);

  // Clear Files
  await clearDir(outDir);

  // Create Options
  const baseLogFormat = "Convert {ORIGIN} -> {OUTPUT}";
  const groupLogFormat = `\n== ${kinds} ${outType} ======\n` + baseLogFormat;
  const baseOption = {
    format: format === "woff" ? "woff-zopfli" : format,
    saveDir: outDir,
    nameFormat: outName,
  };
  const fontOptions = fontList.map((fontFile, i) => {
    const logFormat = i === 0 ? groupLogFormat : baseLogFormat;
    const fontName = basename(fontFile, extname(fontFile));
    const fontPath = join(basePath, fontFile);
    const fontOption = {
      fontPath,
      option: {
        ...baseOption,
        logFormat,
      },
    } as Required<FontPipeI>;

    if (kinds === "glyph") {
      fontOption.option.textFile = join(process.cwd(), "subset_glyphs.txt");
    }
    if (kinds === "dynamic") {
      fontOption.option.cssFile = join(distPath, fontName + ".css");
    }
    return fontOption;
  });
  return fontOptions;
}

// == Main ====================================================================
export function getFontList(family = FONTFAMILY.Freesentation) {
  const extResult = ".ttf";
  const fontList = FONTWEIGHTS.map(
    (weight) => family + "-" + weight + extResult
  );

  return { family, fontList };
}

export async function subsets<T>(...subsetList: Parameters<ISubsets<T>>[]) {
  const options = subsetList.map(async (info) => await createOption(...info));

  await fontPipe((await Promise.all(options)).flat());
}
