/*
  Writes dist/semantic-tokens.json, the inventory of required semantic tokens.

  The inventory is derived from lib/semantic-tokens.css, which stays the single
  source of truth. sys42-check-tokens reads the generated file.
*/
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(resolve(root, "lib/semantic-tokens.css"), "utf8");
const { version } = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);

const declarations = css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .matchAll(/(--s42-[\w-]+)\s*:\s*([^;]+);/g);

const tokens = [];
for (const [, name, value] of declarations) {
  if (tokens.some((token) => token.name === name)) {
    throw new Error(`Duplicate semantic token ${name}`);
  }
  tokens.push({
    name,
    category: name.replace(/^--s42-/, "").split("-")[0],
    defaultValue: value.replace(/\s+/g, " ").trim(),
  });
}

// Color roles are camelCase, modifiers follow after a hyphen
// (onSurface-muted). on<Role> is the foreground for the background <role>, so
// that background must exist: onSurface-danger needs surface, onControlAccent
// needs controlAccent.
const names = new Set(tokens.map((token) => token.name));
const unpaired = [...names].filter((name) => {
  const match = name.match(/^--s42-color-on([A-Z][a-zA-Z]*)/);
  if (!match) return false;
  const role = match[1][0].toLowerCase() + match[1].slice(1);
  return !names.has(`--s42-color-${role}`);
});
if (unpaired.length > 0) {
  throw new Error(
    `These on<Role> tokens have no matching background token: ${unpaired.join(", ")}. ` +
      "Add the background token or use a modifier of an existing pair (onSurface-danger).",
  );
}

// Token names have two or three segments after --, separated by hyphens, and
// each segment is one camelCase word: --(s42-){category}-{name}-{modifier} for
// semantic tokens and primitives, --{family}-{variant}-{property} for family
// tokens. Private --_* variables are exempt.
const TOKEN_NAME =
  /^--(s42-)?[a-z][a-zA-Z0-9]*-[a-z0-9][a-zA-Z0-9]*(-[a-z0-9][a-zA-Z0-9]*)?$/;
const invalid = new Set();
for (const entry of readdirSync(resolve(root, "lib"), { recursive: true })) {
  if (!entry.endsWith(".css")) continue;
  const source = readFileSync(resolve(root, "lib", entry), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );
  for (const [, name] of source.matchAll(/(?<![\w-])(--[a-zA-Z][\w-]*)/g)) {
    if (!TOKEN_NAME.test(name)) invalid.add(`${name} (lib/${entry})`);
  }
}
if (invalid.size > 0) {
  throw new Error(
    `These token names need two or three camelCase segments (see https://receter.github.io/sys42/tokens/overview#naming): ${[...invalid].join(", ")}`,
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
