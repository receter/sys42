/*
  Writes dist/semantic-tokens.json, the inventory of required semantic tokens.

  The inventory is derived from lib/semantic-tokens.css, which stays the single
  source of truth. sys42-check-tokens reads the generated file.
*/
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(resolve(root, "lib/semantic-tokens.css"), "utf8");
const { version } = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);

const declarations = css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .matchAll(/(--sys42-[\w-]+)\s*:\s*([^;]+);/g);

const tokens = [];
for (const [, name, value] of declarations) {
  if (tokens.some((token) => token.name === name)) {
    throw new Error(`Duplicate semantic token ${name}`);
  }
  tokens.push({
    name,
    category: name.replace(/^--sys42-/, "").split("-")[0],
    defaultValue: value.replace(/\s+/g, " ").trim(),
  });
}

// `on-<background>` names the paired foreground of exactly that background
// token, so the background must exist. A foreground used on a background it
// isn't paired with is named `<tone>-on-<background>` instead.
const names = new Set(tokens.map((token) => token.name));
const unpaired = [...names].filter(
  (name) =>
    name.startsWith("--sys42-color-on-") &&
    !names.has(name.replace("--sys42-color-on-", "--sys42-color-")),
);
if (unpaired.length > 0) {
  throw new Error(
    `These on-* tokens have no matching background token: ${unpaired.join(", ")}. ` +
      "Add the background or rename them to <tone>-on-<background>.",
  );
}

mkdirSync(resolve(root, "dist"), { recursive: true });
writeFileSync(
  resolve(root, "dist/semantic-tokens.json"),
  JSON.stringify({ version, tokens }, null, 2) + "\n",
);
console.log(
  `Wrote ${tokens.length} semantic tokens to dist/semantic-tokens.json`,
);
