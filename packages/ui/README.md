# System 42 UI

System 42 is a design system for building consistent and accessible web applications. This package contains React components and styles.

**Documentation: https://receter.github.io/sys42/**

## Installation

```bash
npm install @sys42/ui
```

Add the base styles and the native theme to your main file:

```jsx
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

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

## Documentation

- [Getting started](https://receter.github.io/sys42/getting-started)
- [Components](https://receter.github.io/sys42/components/button) with editable examples
- [Extending components](https://receter.github.io/sys42/extending/overview): component hooks, base hooks and the type strategy
- [Design tokens and theming](https://receter.github.io/sys42/tokens/overview), the [color system](https://receter.github.io/sys42/colors/color-system) and the [migration to 4.0.0](https://receter.github.io/sys42/tokens/migration-4)
- [Cosmos showcase](https://receter.github.io/sys42/cosmos/)

The docs live in `packages/website` of the [repository](https://github.com/receter/sys42).

## Checking a token mapping

`@sys42/ui` ships a reporting-only CLI that compares your CSS with the semantic token inventory of the installed version:

```bash
npx sys42-check-tokens src/styles/theme.css
npx sys42-check-tokens --overrides src/styles/overrides.css
```

See [Setup](https://receter.github.io/sys42/tokens/setup#checking-your-mapping).
