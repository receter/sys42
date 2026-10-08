/*
  Generates the color palettes in lib/primitive-tokens.css.

  Usage: node scripts/generate-primitive-colors.mjs [--check]

  Every palette is defined only by a hue and a peak chroma in OKLCH. Each step
  has a fixed lightness (STEP_LIGHTNESS). Chroma peaks around mid lightness and
  falls off towards white and black (chromaAt). Colors outside sRGB are brought
  into gamut by reducing chroma, keeping lightness and hue.

  The generated block between the @generated markers is replaced in place.
  --check exits with 1 if the file is out of date instead of writing it.
*/
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Hues are seeded from the colors used before the token system (v3)
const PALETTES = {
  neutral: { hue: 0, chroma: 0 },
  mauve: { hue: 290, chroma: 0.015 },
  indigo: { hue: 277, chroma: 0.11 },
  blue: { hue: 264, chroma: 0.24 },
  purple: { hue: 305, chroma: 0.2 },
  red: { hue: 27, chroma: 0.22 },
  amber: { hue: 75, chroma: 0.17 },
  green: { hue: 142, chroma: 0.17 },
};

const STEP_LIGHTNESS = {
  0: 1,
  50: 0.97,
  100: 0.93,
  200: 0.87,
  300: 0.79,
  400: 0.71,
  500: 0.63,
  600: 0.53,
  700: 0.45,
  800: 0.37,
  900: 0.26,
  950: 0.2,
  1000: 0,
};

// White and black only exist once, in the neutral palette
const NEUTRAL_ONLY_STEPS = [0, 1000];

const PEAK_LIGHTNESS = 0.6;
const CHROMA_SPREAD = 0.42;

function chromaAt(lightness, peakChroma) {
  const distance = (lightness - PEAK_LIGHTNESS) / CHROMA_SPREAD;
  return peakChroma * Math.max(0, 1 - distance * distance);
}

function oklchToLinearSrgb(l, c, h) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

function isInGamut(rgb) {
  return rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);
}

function toHex(l, c, h) {
  let chroma = c;
  if (!isInGamut(oklchToLinearSrgb(l, chroma, h))) {
    let low = 0;
    let high = chroma;
    for (let i = 0; i < 32; i++) {
      const mid = (low + high) / 2;
      if (isInGamut(oklchToLinearSrgb(l, mid, h))) low = mid;
      else high = mid;
    }
    chroma = low;
  }
  return (
    "#" +
    oklchToLinearSrgb(l, chroma, h)
      .map((v) => Math.min(1, Math.max(0, v)))
      .map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055))
      .map((v) =>
        Math.round(v * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function generate() {
  const lines = [];
  for (const [name, { hue, chroma }] of Object.entries(PALETTES)) {
    for (const [step, lightness] of Object.entries(STEP_LIGHTNESS)) {
      if (name !== "neutral" && NEUTRAL_ONLY_STEPS.includes(Number(step))) {
        continue;
      }
      const hex = toHex(lightness, chromaAt(lightness, chroma), hue);
      lines.push(`  --color-${name}-${step}: ${hex};`);
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
