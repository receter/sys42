/*
  Generates the color palettes in lib/primitive-tokens.css.

  Usage: node scripts/generate-primitive-colors.mjs [--check]

  The palettes are Material 3 tonal palettes with the M3 tones from 0 (black)
  to 100 (white). Each palette is defined by a seed color, whose hue and chroma
  in HCT (the color space of Material 3) define the palette, or directly by a
  hue and a chroma. The tones are calculated with
  @material/material-color-utilities, so the same input always gives the same
  colors, matching the Material Theme Builder.

  Palettes are named by role, not by appearance. The semantic mapping in
  semantic-tokens.css decides where each palette is used.

  The generated block between the @generated markers is replaced in place.
  --check exits with 1 if the file is out of date instead of writing it.
*/
import {
  argbFromHex,
  hexFromArgb,
  TonalPalette,
} from "@material/material-color-utilities";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PALETTES = {
  primary: { seed: "#2B101B" },
  secondary: { seed: "#9C8D91" },
  tertiary: { seed: "#A28D7E" },
  neutral: { seed: "#958F90" },
  danger: { seed: "#FF5449" },
  // No seed: amber and green at a similar, moderate intensity. Taking danger's
  // chroma makes success neon, and harmonizing with primary moves warning
  // towards the danger red.
  warning: { hue: 85, chroma: 55 },
  success: { hue: 145, chroma: 50 },
};

function createPalette({ seed, hue, chroma }) {
  return seed
    ? TonalPalette.fromInt(argbFromHex(seed))
    : TonalPalette.fromHueAndChroma(hue, chroma);
}

const TONES = [
  100, 99, 98, 95, 90, 80, 70, 60, 50, 40, 35, 30, 25, 20, 15, 10, 5, 0,
];

function generate() {
  const lines = [];
  for (const [name, definition] of Object.entries(PALETTES)) {
    const palette = createPalette(definition);
    for (const tone of TONES) {
      lines.push(
        `  --color-${name}-${tone}: ${hexFromArgb(palette.tone(tone))};`,
      );
    }
    lines.push("");
  }
  lines.pop();
  return lines.join("\n");
}

const START =
  "  /* @generated colors start: scripts/generate-primitive-colors.mjs */";
const END = "  /* @generated colors end */";

const file = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../lib/primitive-tokens.css",
);
const css = readFileSync(file, "utf8");
const startIndex = css.indexOf(START);
const endIndex = css.indexOf(END);
if (startIndex === -1 || endIndex === -1) {
  console.error(`Markers not found in ${file}`);
  process.exit(1);
}
const next =
  css.slice(0, startIndex + START.length) +
  "\n" +
  generate() +
  "\n" +
  css.slice(endIndex);

if (process.argv.includes("--check")) {
  if (next !== css) {
    console.error("primitive-tokens.css is out of date, run tokens:colors");
    process.exit(1);
  }
  console.log("primitive-tokens.css is up to date");
} else {
  writeFileSync(file, next);
  console.log(`Wrote colors to ${file}`);
}
