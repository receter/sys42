# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

System 42 is a PNPM monorepo (Node version in `.nvmrc`) with these packages under `packages/`:

- `ui` — `@sys42/ui`, React component library (Vite library mode, CSS Modules, CSS custom properties)
- `utils` — `@sys42/utils`, utilities and hooks (e.g. `cn`, `usePersistentState`, `usePrevious`); `ui` depends on it via `workspace:^`
- `copilot` — `@sys42/copilot`, markdown instruction files for AI assistants (`instructions/` copied to `dist/` on build)
- `example-consumer` — private Vite app consuming `ui` and `utils`

There is no root `package.json`; run scripts per package with `pnpm --filter <name>` or in the package directory directly.

## Commands

```bash
pnpm install

# UI library
pnpm --filter @sys42/ui dev            # Vite dev app (src/)
pnpm --filter @sys42/ui cosmos         # React Cosmos playground (fixtures/)
pnpm --filter @sys42/ui build          # tsc + JS build + separate CSS build
pnpm --filter @sys42/ui lint
pnpm --filter @sys42/ui cosmos-export  # static Cosmos build (deployed to GitHub Pages)
pnpm --filter @sys42/ui tokens:colors  # regenerate the primitive color palettes
pnpm --filter @sys42/ui tokens:check   # verify the palettes are up to date

# Utils
pnpm --filter @sys42/utils build

# Example app
pnpm --filter example-consumer dev
```

There is no test suite. Type checking happens via `tsc` in each package's `build`. Build `utils` before `ui` if `utils` changed, because `ui` consumes `@sys42/utils` from its `dist`.

## UI Package Architecture

- `lib/` is the published library source; `lib/main.ts` is the entry that re-exports everything. `src/` is only a local dev app; `fixtures/` holds React Cosmos fixtures (`*.fixture.tsx`), which serve as the component showcase.
- **Per-file build output:** `vite-build.config.ts` turns every `lib/**/*.{ts,tsx}` into its own entry (preserving the folder structure) and uses `vite-plugin-lib-inject-css`, so each component's JS imports only its own CSS. This keeps the library tree-shakeable. `react` and `@sys42/utils` are external.
- **CSS build:** `vite-build-css.config.ts` separately emits `base.css`, `primitive-tokens.css`, `semantic-tokens.css` and `default-custom-properties.css` (imports the two token files), exported under the same names from `@sys42/ui`. The build then runs `scripts/generate-token-inventory.mjs`, which writes `dist/semantic-tokens.json` from `lib/semantic-tokens.css`.
- **CSS layers:** `postcss.config.js` (postcss-assign-layer) wraps all `lib/**/*.css` in the `sys42` layer and `lib/base.css` in the `sys42-base` layer.
- **Design tokens** (consumer docs in `packages/ui/TOKENS.md`):
  - **Primitives** (`lib/primitive-tokens.css`): raw scales without the `--s42-` prefix (`--color-primary-40`, `--space-md`). The color palettes are Material 3 tonal palettes named by role (`primary`, `secondary`, `tertiary`, `danger`, `warning`, `success`, `neutral`, tones 0–100), generated with `@material/material-color-utilities` by `scripts/generate-primitive-colors.mjs` (`pnpm --filter @sys42/ui tokens:colors`), so don't edit them by hand.
  - **Semantic** (`lib/semantic-tokens.css`): every `--s42-*` token, mapped to primitives. Named `--s42-{category}-{name}-{modifier}` (see Naming below). Color names are roles like `surfaceBright`, `controlAccent`, `containerSuccess`. `on<Role>` is the foreground for the background `<role>` (`controlAccent` / `onControlAccent`), and the background must exist. A modifier after a hyphen is the same usage in another variant and never names a new background: `onSurface-danger` is danger text on `surface`. New backgrounds get their own camelCase role (`containerDanger`). The inventory script fails the build on an `on<Role>` token without its background. This file is the authoritative inventory. Adding or removing a semantic token is a breaking change.
  - **Family tokens** (`--button-background`, `--input-radius`): optional inputs, `--{family}-{variant}-{property}`: the variant or state is optional and the property always comes last (`--button-borderColor`, `--button-highlight-borderColor`, `--menuItem-selected-fontWeight`). They are never defined by the library. A component reads only its own family's tokens, always with a semantic fallback: `--_radius: var(--button-radius, var(--s42-radius-control));`. Color tokens are per variant (`--button-background` is not a fallback for `--button-accent-background`). Shape and spacing tokens are shared across variants. There are no public state-color tokens: derive hover/active from the resolved `--_*` values.
  - **Naming:** hyphens only separate segments, each segment is one camelCase word, two or three segments after `--`. Semantic tokens and primitives are `--(s42-){category}-{name}-{modifier}` (`--s42-space-controlX`, `--s42-color-onSurface-muted`, `--fontSize-sm`); the modifier is an optional variant or size. Family tokens are `--{family}-{variant}-{property}` with the property last (`--button-accent-color`). Only semantic tokens have the `s42-` prefix. The inventory script fails the build on token names in `lib/` with more than three segments or a non-camelCase segment.
  - **Internal** `--_*` variables: initialize every one a component uses on its own root selector. They keep plain kebab-case (`--_padding-x`) and are exempt from the naming scheme.
  - Component CSS (and `base.css`) must never reference primitives, not even in fallbacks. Fallbacks are semantic tokens or the keywords `transparent`/`inherit`.
  - Families: Button (Button, SplitButton, MenuButton, OverflowMenu), Input (TextInput, TextArea, Select, Listbox), Menu item (all `*Item` menu components, ListboxItem), Checkbox, Radio, Message, Card (`classCard`), Stack. Record new families and tokens in `TOKENS.md`.
  - From 4.0.0 on, record every rename and removal of a public token in `packages/ui/token-migrations.json` (4.0.0 itself is documented only generally in `TOKENS-MIGRATION.md`), which `bin/sys42-check-tokens.mjs` (the `sys42-check-tokens` CLI) uses to report them.
- **Dropdowns:**
  - **Menus** (OverflowMenu, SplitButton, MenuButton) share `lib/hooks/useMenu.ts`. It's our own implementation of the WAI-ARIA menu button pattern (no downshift). Each menu has its own item component (`OverflowMenuItem`, `SplitButtonItem`, `MenuButtonItem`). The items share their behaviour through `lib/hooks/useMenuItem.ts`: a `<button role="menuitem">` that closes the menu through `MenuContext` before calling `onClick`. `useMenu` reads the items from the DOM (`[role="menuitem"]`) when a key is pressed, so items can be wrapped or rendered by other components. The hooks in `lib/hooks/` are internal and not exported from `main.ts`.
  - **Listbox** (a custom single select) uses downshift's `useSelect`, and downshift is external in the build. It accepts only `<ListboxItem>` children (fragments are unwrapped, anything else throws). Listbox reads their props up front to build downshift's items (the item `value`s) and then renders `children` as they are. Each `ListboxItem` renders itself and connects to downshift through `ListboxContext`, finding its index by `value`.
  - **Select**/**Option** wrap the native `<select>`/`<option>`. Select has a minimal style based on the `--input-*` family tokens, like TextInput. Option has no styles, so it has no `useOption` hook and no CSS module. Use Listbox when you need rich option content or full styling.
- **A CSS module belongs to exactly one component and is imported only by its `use<Name>` hook.** Don't share CSS modules between components, and don't import them in the `.tsx` file; either creates extra shared chunks in the build. Shared looks are duplicated per component and kept in sync through tokens. For example, each menu item has its own styles based on the `--menuItem-*` family tokens, SplitButton and MenuButton recreate the Button look from the `--button-*` family tokens, and every popup menu uses `--s42-color-surfaceBright` and the `--s42-*-overlay` semantic tokens.
- **Helper classes** (`lib/helperClasses/`) export class names (e.g. `classCard`, `classContent`). Don't import `.module.css` directly in `main.ts`, or its CSS ends up in the main bundle.

### Component pattern

Each component folder (e.g. `lib/Button/`) follows a layered hook pattern:

1. `useBase<Name>.ts` handles unstyled behavior. It takes `UseComponentOptions<Props, TTagName>` plus an optional `interceptor(draft)`, splits custom props off (`restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>`), narrows by element with `isPropsForElement`, and returns `{ elementProps, elementRef }` (refs merged with `react-merge-refs`).
2. `use<Name>.ts` handles the styled layer. It extracts style props (e.g. `variant`, `size`), passes the rest with `satisfies ExactProps<BaseProps, Props>`, and adds CSS-module classes through the interceptor using `cn`.
3. `<Name>.tsx` (plus variants like `ButtonA.tsx` for other elements) is built with `createComponent<Props, "tag">("tag", hookOptions => …)` from `lib/helpers.ts`. It wraps `forwardRef` and types props as `Sys42Props<Props, TTagName>`, which is intrinsic element props with custom props taking precedence.
4. `index.ts` re-exports the components, hooks, and prop types, and `lib/main.ts` re-exports the folder.

Global helper types (`Sys42Props`, `HTMLElementTagName`, `UseComponentOptions`, `UseComponentInterceptor`, `ExactProps`, `EmptyObject`) are declared globally in `lib/types.d.ts`. `TypeStrategy.md` explains the reasoning behind them.

## Code Conventions

From `.github/copilot-instructions.md` and ESLint config:

- Import CSS modules as `import styles from "./styles.module.css";`
- Name the outermost element's class after the component in camelCase (`MyComponent` → `myComponent`); modifiers use `_` (e.g. `button_accent`).
- Use `function handleClick() {}` rather than arrow-function consts for handlers.
- Use `type` rather than `interface` for props (an exception is empty base props like `BaseButtonProps`, see the comment there).
- Components that replace an HTML element stay compatible with its props. Native handlers like `onChange` keep their native signature (the original event). Value callbacks are named `onValueChange` and are called with `(value, event)` when a native event exists, or `(value)` for custom widgets like `Listbox`. Call `onChange` before `onValueChange`. See "Props and Event Handlers" in `packages/ui/README.md`.
- Declare components with the `function` keyword (`export function MyComponent() {}`), unless they're created with `createComponent`.
- Don't `import React` just for JSX.
- Import order is enforced by `simple-import-sort` with these groups: side-effect imports, packages, absolute/parent, `./` relative, `*.module.css`, then media.
- Prettier uses default settings.

## Releases

Release Please runs on push to `main` (`release-please-config.json` for `ui`/`utils`, and a separate config for `copilot`). It publishes to npm and deploys the Cosmos export to GitHub Pages. Use Conventional Commits. When bumping a dependency package, write the commit as `<type>[scope]: update <package-name> from <old> to <new>` (see `packages/copilot/instructions/commit-message-generation.md`).
