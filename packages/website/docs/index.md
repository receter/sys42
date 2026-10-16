---
sidebar_position: 1
title: Introduction
slug: /
---

# System 42

System 42 is a collection of principles, components and utilities that are designed to work together to make it easier to build consistent, accessible and performant UIs for web applications.

The component library `@sys42/ui` can be used right out of the box or serve as a foundation for building your own component library. Every component comes in three layers, so you can pick how much of System 42 you want: the styled React component, a hook that renders the same component on another element, or a base hook with the behaviour only and no styles at all. Read [Extending components](./extending/overview.md) for the details.

Styling is CSS only. Components read [design tokens](./tokens/overview.md) (CSS custom properties), so a theme is a stylesheet, not a provider. The native theme is built on [Material 3 tonal palettes](./colors/color-system.mdx).

```jsx live
<Stack>
  <FormField label="What is your name?">
    {({ htmlFor }) => <TextInput id={htmlFor} placeholder="Type something" />}
  </FormField>
  <div className={classButtonGroup}>
    <Button variant="accent">Save</Button>
    <Button>Cancel</Button>
  </div>
</Stack>
```

Examples like the one above are editable: change the code and the result updates. Every export of `@sys42/ui` is available in them without an import.

## Packages

System 42 is a monorepo managed with PNPM:

- `@sys42/ui`: the React component library, documented on this site
- `@sys42/utils`: utilities and hooks (`cn`, `usePersistentState`, `usePrevious`)
- `@sys42/copilot`: markdown instruction files for AI assistants

The repository also contains an example app (`example-consumer`) that uses the component library, the [Cosmos showcase](pathname:///cosmos/) of all components, and this website.

## Technical simplicity

To avoid overly complex setups and reduce maintenance overhead, the project is built on a small set of technologies with minimal configuration:

- Vite (library mode)
- TypeScript
- React
- CSS Modules
- CSS custom properties

The project uses Prettier for code formatting and ESLint for linting and import sorting. There is no CSS-in-JS, no runtime theming and no build-time token pipeline besides a plain CSS file per token layer.

## Principles

### Embrace HTML

When building components, prefer existing HTML elements and attributes over custom solutions. Most of that has been well designed and thought through by the Web community and is accessible by default. Components that replace an HTML element stay drop-in compatible with its props, and native handlers keep their native signature (see [Props and event handlers](./extending/props-and-event-handlers.md)).

### CSS custom properties

All visual decisions are expressed as [design tokens](./tokens/overview.md). Semantic tokens (`--s42-*`) are the contract between a theme and the components, and optional family tokens (`--button-radius`) configure one group of components. Because tokens are custom properties, they follow the cascade: a nested theme is just a selector that overrides tokens.

### CSS Modules

Each component has its own [CSS Module](https://github.com/css-modules/css-modules). Class names are local, so component styles never collide, and the library stays tree-shakeable because every component's JavaScript imports only its own CSS. All component styles live in the cascade layer `sys42`, so any unlayered CSS of your application wins over them.

### margin-top

Whenever `margin` is used to create space between elements, `margin-top` is preferred. The base stylesheet removes the default margins of headings, paragraphs and lists, and the [Stack](./components/stack.mdx) component adds the space between its children. Read [why margin-top](https://dev.to/receter/why-i-fell-in-love-with-margin-top-3flg).

## Extensibility

System 42 is designed to be the foundation of your own component library:

- Use the **component hooks** (`useButton`) to render a component on another element, for example a router link that looks like a button.
- Use the **base hooks** (`useBaseButton`) to keep the behaviour and write your own styles.
- Use the **tokens** to re-theme everything without touching a component, or replace the native primitives with your own.

The [Extending components](./extending/overview.md) section explains each option.

## Contributing and support

Feel free to open issues, submit pull requests or discuss ideas in the [GitHub repository](https://github.com/receter/sys42). If you encounter a problem or have a question, please create an issue. See [Contributing](./contributing/architecture.md) for how the library is built.

## Projects using System 42

- [focus-log-extension](https://github.com/receter/focus-log-extension)
- [gym-tracker](https://github.com/receter/gym-tracker)
- [stl.parts](https://stl.parts)

## License

System 42 is licensed under the [MIT License](https://opensource.org/license/mit/).
