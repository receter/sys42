#!/usr/bin/env node
/*
  Reports problems in a project's sys42 semantic token mapping. Reporting only:
  it never changes any file.

  Usage: sys42-check-tokens [--overrides] <file.css> [more.css ...]

  Reports
  - required semantic tokens missing from the mapping (skipped with --overrides,
    for projects that load the native default mapping and only override a few)
  - renamed tokens, with the new name from token-migrations.json
  - removed tokens, with migration guidance
  - unknown --s42-* names
  - custom properties from 3.x (--sys42-*), which were replaced in 4.0.0

  Only --s42-* names are checked. Your own primitives and the optional family
  tokens (e.g. --button-radius) are never reported.

  Limits: this is a static text check. It does not know which selectors apply
  at runtime, whether values are valid, or whether var() references resolve in
  every theme.
*/
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(path) {
  return JSON.parse(readFileSync(resolve(packageRoot, path), "utf8"));
}

const args = process.argv.slice(2);
const isOverridesOnly = args.includes("--overrides");
const files = args.filter((arg) => !arg.startsWith("--"));

if (files.length === 0 || args.includes("--help")) {
  console.log(
    "Usage: sys42-check-tokens [--overrides] <file.css> [more.css ...]",
  );
  process.exit(files.length === 0 && !args.includes("--help") ? 2 : 0);
}

let inventory;
try {
  inventory = readJson("dist/semantic-tokens.json");
} catch {
  console.error("Missing dist/semantic-tokens.json, build @sys42/ui first.");
  process.exit(2);
}
const required = new Set(inventory.tokens.map((token) => token.name));

const renamed = new Map();
const removed = new Map();
for (const migration of readJson("token-migrations.json").migrations) {
  for (const entry of migration.renamed) {
    renamed.set(entry.from, { ...entry, version: migration.version });
  }
  for (const entry of migration.removed) {
    removed.set(entry.name, { ...entry, version: migration.version });
  }
}

// name -> [{ file, line, kind }]
const declared = new Map();
const referenced = new Map();
// 3.x custom properties used the --sys42- prefix
const legacy = new Map();

function record(map, name, location) {
  if (!map.has(name)) map.set(name, []);
  map.get(name).push(location);
}

for (const file of files) {
  const source = readFileSync(file, "utf8");
  // Blank out comments but keep line breaks so line numbers stay correct
  const css = source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, " "),
  );
  css.split("\n").forEach((text, index) => {
    const location = `${file}:${index + 1}`;
    for (const [, name] of text.matchAll(/(--s42-[\w-]+)\s*:/g)) {
      record(declared, name, location);
    }
    for (const [, name] of text.matchAll(/var\(\s*(--s42-[\w-]+)/g)) {
      record(referenced, name, location);
    }
    for (const [, name] of text.matchAll(/(--sys42-[\w-]+)/g)) {
      record(legacy, name, location);
    }
  });
}

const problems = {
  missing: [],
  renamed: [],
  removed: [],
  unknown: [],
  legacy: [],
};

for (const [name, locations] of [...legacy].sort()) {
  problems.legacy.push({ name, locations });
}

if (!isOverridesOnly) {
  for (const name of required) {
    if (!declared.has(name)) problems.missing.push(name);
  }
}

const seen = new Set([...declared.keys(), ...referenced.keys()]);
for (const name of [...seen].sort()) {
  if (required.has(name)) continue;
  const locations = [
    ...(declared.get(name) ?? []),
    ...(referenced.get(name) ?? []),
  ];
  if (renamed.has(name)) {
    problems.renamed.push({ name, locations, ...renamed.get(name) });
  } else if (removed.has(name)) {
    problems.removed.push({ name, locations, ...removed.get(name) });
  } else {
    problems.unknown.push({ name, locations });
  }
}

const where = (locations) => locations.join(", ");

if (problems.missing.length > 0) {
  console.log(`\nMissing semantic tokens (${problems.missing.length}):`);
  for (const name of problems.missing) console.log(`  ${name}`);
}
if (problems.renamed.length > 0) {
  console.log(`\nRenamed tokens (${problems.renamed.length}):`);
  for (const entry of problems.renamed) {
    console.log(`  ${entry.name} -> ${entry.to} (${entry.version})`);
    if (entry.note) console.log(`    ${entry.note}`);
    console.log(`    at ${where(entry.locations)}`);
  }
}
if (problems.removed.length > 0) {
  console.log(`\nRemoved tokens (${problems.removed.length}):`);
  for (const entry of problems.removed) {
    console.log(`  ${entry.name} (removed in ${entry.version})`);
    console.log(`    ${entry.guidance}`);
    console.log(`    at ${where(entry.locations)}`);
  }
}
if (problems.unknown.length > 0) {
  console.log(`\nUnknown --s42-* tokens (${problems.unknown.length}):`);
  for (const entry of problems.unknown) {
    console.log(`  ${entry.name}`);
    console.log(`    at ${where(entry.locations)}`);
  }
}
if (problems.legacy.length > 0) {
  console.log(`\n3.x custom properties (${problems.legacy.length}):`);
  for (const entry of problems.legacy) {
    console.log(`  ${entry.name}`);
    console.log(`    at ${where(entry.locations)}`);
  }
  console.log(
    "  4.0.0 replaced them with a new token system, see TOKENS-MIGRATION.md in @sys42/ui.",
  );
}

const count = Object.values(problems).reduce(
  (sum, list) => sum + list.length,
  0,
);
if (count === 0) {
  console.log(
    isOverridesOnly
      ? `No outdated or unknown sys42 tokens (@sys42/ui ${inventory.version}).`
      : `All ${required.size} semantic tokens are mapped (@sys42/ui ${inventory.version}).`,
  );
}
console.log(
  "\nNote: this is a static check. It can't tell whether every token resolves to a valid value at runtime in every theme.",
);
process.exit(count === 0 ? 0 : 1);
