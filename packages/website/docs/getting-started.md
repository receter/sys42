---
sidebar_position: 2
---

# Getting started

## Installation

```bash
npm install @sys42/ui
```

`@sys42/ui` has `react` and `react-dom` as peer dependencies (18.2 or newer) and depends on `@sys42/utils`, which is installed automatically.

## Styles

Every component imports its own `.css` file with default styles based on [design tokens](./tokens/overview.md). The component styles depend on two things your application has to load once:

- `base.css`: CSS normalization and basic styles (page colors, typography, removed default margins). It lives in the cascade layer `sys42-base`.
- A complete mapping of the semantic tokens (`--s42-*`). The native theme ships this mapping in `default-custom-properties.css`, which loads the native primitives and the semantic tokens.

Add both imports to your main file:

```jsx
// main.tsx
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

If your project has its own primitives, import `base.css` and your own semantic mapping instead, see [Your own primitives](./tokens/setup.md#your-own-primitives).

All component styles are inside a [CSS layer](https://www.w3.org/TR/css-cascade-5/#layering) named `sys42`, so your own unlayered CSS always wins over the defaults.

## First component

```jsx
import { Button, Stack, TextInput } from "@sys42/ui";

function App() {
  return (
    <Stack>
      <TextInput placeholder="Type something" />
      <Button>Click me</Button>
    </Stack>
  );
}
```

```jsx live
<Stack>
  <TextInput placeholder="Type something" />
  <Button>Click me</Button>
</Stack>
```

## Customizing the look

You can customize the look of the components by overriding semantic tokens (`--s42-*`) for system-wide decisions, or optional family tokens (for example `--button-radius`) for a group of components:

```css
:root {
  --s42-color-controlAccent: #0b6e4f;
  --s42-radius-control: 999px;
}
```

```jsx live
<div style={{ "--s42-color-controlAccent": "#0b6e4f", "--s42-radius-control": "999px" }}>
  <Button variant="accent">Rounded accent</Button>
</div>
```

Read [Design tokens](./tokens/overview.md) for all tokens and the setup options. If you need to go beyond what the tokens expose, use the [component hooks or the base hooks](./extending/overview.md) and style the components yourself.

## Where to go next

- [Components](./components/button.mdx): every component with editable examples.
- [Extending components](./extending/overview.md): hooks, `createComponent` and the type strategy.
- [Design tokens](./tokens/overview.md) and the [color system](./colors/color-system.mdx).
- Coming from 3.x? See [Migrating to the token system](./tokens/migration-4.md).
