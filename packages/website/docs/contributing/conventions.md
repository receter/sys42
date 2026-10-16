---
sidebar_position: 2
---

# Conventions

## Code

- Import CSS modules as `import styles from "./styles.module.css";`.
- Name the outermost element's class after the component in camelCase (`MyComponent` → `myComponent`); modifiers use `_` (e.g. `button_accent`).
- Use `function handleClick() {}` rather than arrow-function consts for handlers.
- Use `type` rather than `interface` for props (an exception is empty base props like `BaseButtonProps`).
- Components that replace an HTML element stay compatible with its props. Native handlers like `onChange` keep their native signature. Value callbacks are named `onValueChange` and are called with `(value, event)` when a native event exists, or `(value)` for custom widgets like `Listbox`. Call `onChange` before `onValueChange`. See [Props and event handlers](../extending/props-and-event-handlers.md).
- Declare components with the `function` keyword (`export function MyComponent() {}`), unless they're created with `createComponent`.
- Don't `import React` just for JSX.
- Import order is enforced by `simple-import-sort` with these groups: side-effect imports, packages, absolute/parent, `./` relative, `*.module.css`, then media.
- Prettier uses default settings.

These conventions are also published as instruction files for AI assistants in `@sys42/copilot`.

## Documentation

The docs on this site are the single source of truth. Package READMEs only point here. When you add a component, add a page in `packages/website/docs/components/` with editable examples (` ```jsx live ` blocks; every export of `@sys42/ui` is in scope), a props table and its family. When you add a family or a token, update [Families](../tokens/families.md); the [semantic token reference](../tokens/semantic-tokens.mdx) is generated from the inventory and needs no edit.

## Commits and releases

Use [Conventional Commits](https://www.conventionalcommits.org/). Release Please runs on push to `main` and creates release pull requests for `ui`, `utils` and `copilot` from the commit history, then publishes to npm. Breaking changes are marked with `!` (`feat(ui)!: …`).

When bumping a dependency package, write the commit as:

```
<type>[scope]: update <package-name> from <old> to <new>
```

The website is private and not released; use the `website` scope for its commits (`docs(website): …`).
