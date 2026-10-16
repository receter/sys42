---
sidebar_position: 2
---

# Setup

All sys42 styles are in the CSS layer `sys42` (base styles in `sys42-base`), so your unlayered CSS always wins over the defaults.

## Native theme

Import `base.css` and the native tokens:

```js
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

`default-custom-properties.css` is a convenience entry point that loads both definition files. You can also import them explicitly, with the same result:

```js
import "@sys42/ui/primitive-tokens.css";
import "@sys42/ui/semantic-tokens.css";
```

`semantic-tokens.css` maps every semantic token to a native primitive and does **not** import the primitives itself, so don't load it on its own.

To adjust the native theme, override semantic tokens (or family tokens) in your own CSS:

```css
:root {
  --s42-color-controlAccent: #0b6e4f;
  --s42-radius-control: 999px;
}
```

## Your own primitives

If your project has its own primitives, don't import `default-custom-properties.css`, `primitive-tokens.css` or `semantic-tokens.css`. Instead, define your primitives and map **every** semantic token listed in the [semantic token reference](./semantic-tokens.mdx) to them:

```js
import "@sys42/ui/base.css";
import "./acme-tokens.css";
```

```css
/* acme-tokens.css (excerpt) */
:root {
  --acme-spacing-300: 0.75rem;
  --acme-corner-rounded: 0.5rem;

  --s42-space-controlX: var(--acme-spacing-300);
  --s42-radius-control: var(--acme-corner-rounded);
  /* ...and all other --s42-* tokens */
}
```

An incomplete mapping is an invalid integration: components would render with missing values. Use the mapping check to find gaps.

## Checking your mapping

`@sys42/ui` ships a reporting-only CLI that compares your CSS with the semantic token inventory of the installed version:

```bash
# Complete custom mapping: reports missing, renamed, removed and unknown tokens
npx sys42-check-tokens src/styles/acme-tokens.css

# Native theme with a few overrides: skips the "missing" check
npx sys42-check-tokens --overrides src/styles/theme.css
```

It reports:

- required semantic tokens your mapping doesn't declare (not with `--overrides`)
- renamed tokens, with the new name
- removed tokens, with migration guidance
- unknown `--s42-*` names

It only checks `--s42-*` names in declarations and `var()` references. Your own primitives and family tokens are never reported. It never changes your files, and exits with `1` if it found something.

Limits: it is a static text check. Declaring a token doesn't prove that it resolves to a valid value at runtime, in every theme scope, or that your `var()` references point to defined primitives. Renames and removals come from explicit migration metadata (`token-migrations.json`), never from similar names. The inventory is also published as `@sys42/ui/semantic-tokens.json`.
