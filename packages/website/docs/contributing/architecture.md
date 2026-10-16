---
sidebar_position: 1
---

# Architecture

This page is for contributors to `@sys42/ui`. It explains how the package is built and the rules that keep it tree-shakeable and themeable.

## Repository

System 42 is a PNPM monorepo (the Node version is in `.nvmrc`) with these packages under `packages/`:

- `ui`: `@sys42/ui`, the React component library (Vite library mode, CSS Modules, CSS custom properties)
- `utils`: `@sys42/utils`, utilities and hooks; `ui` depends on it via `workspace:^`
- `copilot`: `@sys42/copilot`, markdown instruction files for AI assistants
- `example-consumer`: a private Vite app consuming `ui` and `utils`
- `website`: this documentation site (Docusaurus)

There is no root `package.json`; run scripts per package with `pnpm --filter <name>`:

```bash
pnpm install

pnpm --filter @sys42/ui dev            # Vite dev app (src/)
pnpm --filter @sys42/ui cosmos         # React Cosmos playground (fixtures/)
pnpm --filter @sys42/ui build          # tsc + JS build + separate CSS build
pnpm --filter @sys42/ui lint
pnpm --filter @sys42/ui tokens:colors  # regenerate the primitive color palettes
pnpm --filter @sys42/ui tokens:check   # verify the palettes are up to date

pnpm --filter @sys42/utils build
pnpm --filter website start            # this site, needs utils and ui built
```

There is no test suite. Type checking happens via `tsc` in each package's `build`. Build `utils` before `ui` if `utils` changed, because `ui` consumes `@sys42/utils` from its `dist`. The website and the example app consume `@sys42/ui` from its `dist` too.

## The `ui` package

- `lib/` is the published library source; `lib/main.ts` is the entry that re-exports everything. `src/` is only a local dev app; `fixtures/` holds React Cosmos fixtures (`*.fixture.tsx`), which serve as the component showcase.
- **Per-file build output.** `vite-build.config.ts` turns every `lib/**/*.{ts,tsx}` into its own entry (preserving the folder structure) and uses `vite-plugin-lib-inject-css`, so each component's JS imports only its own CSS. This keeps the library tree-shakeable. `react` and `@sys42/utils` are external.
- **CSS build.** `vite-build-css.config.ts` separately emits `base.css`, `primitive-tokens.css`, `semantic-tokens.css` and `default-custom-properties.css` (imports the two token files), exported under the same names from `@sys42/ui`. The build then runs `scripts/generate-token-inventory.mjs`, which writes `dist/semantic-tokens.json` from `lib/semantic-tokens.css`.
- **CSS layers.** `postcss.config.js` (postcss-assign-layer) wraps all `lib/**/*.css` in the `sys42` layer and `lib/base.css` in the `sys42-base` layer.

## Component pattern

Each component folder (e.g. `lib/Button/`) follows a layered hook pattern, which is what makes [extending components](../extending/overview.md) possible:

1. `useBase<Name>.ts` handles unstyled behavior. It takes `UseComponentOptions<Props, TTagName>` plus an optional `interceptor(draft)`, splits custom props off (`restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>`), narrows by element with `isPropsForElement`, and returns `{ elementProps, elementRef }` (refs merged with `react-merge-refs`).
2. `use<Name>.ts` handles the styled layer. It extracts style props (e.g. `variant`, `size`), passes the rest with `satisfies ExactProps<BaseProps, Props>`, and adds CSS-module classes through the interceptor using `cn`.
3. `<Name>.tsx` (plus variants like `ButtonA.tsx` for other elements) is built with `createComponent<Props, "tag">("tag", hookOptions => …)` from `lib/helpers.ts`. It wraps `forwardRef` and types props as `Sys42Props<Props, TTagName>`, which is intrinsic element props with custom props taking precedence.
4. `index.ts` re-exports the components, hooks, and prop types, and `lib/main.ts` re-exports the folder.

Global helper types (`Sys42Props`, `HTMLElementTagName`, `UseComponentOptions`, `UseComponentInterceptor`, `ExactProps`, `EmptyObject`) are declared globally in `lib/types.d.ts`. The [type strategy](../extending/type-strategy.md) explains the reasoning behind them.

**A CSS module belongs to exactly one component and is imported only by its `use<Name>` hook.** Don't share CSS modules between components, and don't import them in the `.tsx` file; either creates extra shared chunks in the build. Shared looks are duplicated per component and kept in sync through tokens. For example, each menu item has its own styles based on the `--menuItem-*` family tokens, SplitButton and MenuButton recreate the Button look from the `--button-*` family tokens, and every popup menu uses `--s42-color-surfaceBright` and the `--s42-*-overlay` semantic tokens.

**Helper classes** (`lib/helperClasses/`) export class names (e.g. `classCard`, `classContent`). Don't import `.module.css` directly in `main.ts`, or its CSS ends up in the main bundle.

## Design tokens

The consumer documentation is in [Design tokens](../tokens/overview.md). The rules for the library source:

- **Primitives** (`lib/primitive-tokens.css`) are raw scales without the `--s42-` prefix. The color palettes are generated by `scripts/generate-primitive-colors.mjs`, so don't edit them by hand (see the [color system](../colors/color-system.mdx)).
- **Semantic tokens** (`lib/semantic-tokens.css`) are every `--s42-*` token, mapped to primitives. The file is the authoritative inventory. `on<Role>` needs its background `<role>`; the inventory script fails the build on an `on<Role>` token without its background. Adding or removing a semantic token is a breaking change.
- **Family tokens** are never defined by the library. A component reads only its own family's tokens, always with a semantic fallback: `--_radius: var(--button-radius, var(--s42-radius-control));`. Color tokens are per variant, shape and spacing tokens are shared across variants. There are no public state-color tokens: derive hover/active from the resolved `--_*` values.
- **Naming** is enforced by the inventory script: hyphens only separate segments, each segment is one camelCase word, two or three segments after `--`.
- **Internal** `--_*` variables: initialize every one a component uses on its own root selector. They keep plain kebab-case (`--_padding-x`) and are exempt from the naming scheme.
- Component CSS (and `base.css`) must never reference primitives, not even in fallbacks. Fallbacks are semantic tokens or the keywords `transparent`/`inherit`.
- Record new families and tokens in the [Families](../tokens/families.md) page. From 4.0.0 on, record every rename and removal of a public token in `packages/ui/token-migrations.json`, which `bin/sys42-check-tokens.mjs` uses to report them.

## Dropdowns

- **Menus** (OverflowMenu, SplitButton, MenuButton) share `lib/hooks/useMenu.ts`, our own implementation of the WAI-ARIA menu button pattern (no downshift). Each menu has its own item component. The items share their behaviour through `lib/hooks/useMenuItem.ts`: a `<button role="menuitem">` that closes the menu through `MenuContext` before calling `onClick`. `useMenu` reads the items from the DOM (`[role="menuitem"]`) when a key is pressed, so items can be wrapped or rendered by other components. The hooks in `lib/hooks/` are internal and not exported.
- **Listbox** uses downshift's `useSelect`, and downshift is external in the build. It accepts only `ListboxItem` children (fragments are unwrapped, anything else throws). Listbox reads their props up front to build downshift's items and then renders `children` as they are. Each `ListboxItem` connects to downshift through `ListboxContext`, finding its index by `value`.
- **Select**/**Option** wrap the native `<select>`/`<option>`. Option has no styles, so it has no `useOption` hook and no CSS module.

## This website

The site lives in `packages/website` and is a Docusaurus site. The docs are in `docs/`, the live examples use `@docusaurus/theme-live-codeblock` with every export of `@sys42/ui` in scope (`src/theme/ReactLiveScope`), and the site colors are mapped from the semantic tokens in `src/css/custom.css`. It is deployed to GitHub Pages on every push to `main` together with the Cosmos export under `/cosmos/`.
