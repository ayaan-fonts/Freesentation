import { FONTFAMILY, getFontList, subsets } from "./subset-utils";

const jobs = [
  getFontList(FONTFAMILY.Freesentation),
];

jobs.forEach((fontList) => {
  subsets(
    // woff
    ["static", "woff", fontList],
    ["glyph", "woff", fontList],
    ["dynamic", "woff", fontList],

    // woff2
    ["static", "woff2", fontList],
    ["glyph", "woff2", fontList],
    ["dynamic", "woff2", fontList]
  );
});
