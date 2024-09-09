# System 42 UI

System 42 is a design system for building consistent and accessible web applications. This package contains components and styles that can easily be used in React applications.

## Installation

```bash
npm install @sys42/ui
```

## Usage

**Styled React Components**
The easiest and most straight forward way to use System 42 is by directly importing the React components. The components come with basic styles that are based on a set of CSS custom properties (CSS variables). All of these properties are defined in `default-custom-properties.css` and prefixed with `--sys42-`. It is highly recommended to import this file in your application. You can customize the styling of the components by overriding the custom properties in your application.

1. Import the base CSS file followed by the default custom properties CSS in your application:

```js
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

All styles as well as the custom properties are in a [CSS Layer](https://www.w3.org/TR/css-cascade-5/#layering)
named `sys42`.

2. Import the components in your application:

```jsx
import { Button, TextInput, Stack } from "@sys42/components";

function App() {
  return (
    <Stack>
      <TextInput placeholder="Type something" />
      <Button>Click me</Button>
    </Stack>
  );
}
```

**Using the React Hooks**
In addition to the React components, React hooks exist for all components and can be used in case you want more control and/or opt out of the default styling. There are two hooks available for every component: one that contains basic behaviour and another one that is based on the first but also contains styling related things. The hooks are named the same as the components but with a `useBase`/`use` prefix. The hooks return everything you need to render the component.

One use case for a hook is if you want to render a component as a different element. One typyical example would be a button as a react-router Link.

You can use the `useButton` hook to get the button props and then spread them on a `Link` component.

```jsx
import { Link } from "react-router-dom";
import { useButton } from "@sys42/ui";

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  ButtonProps<React.ComponentProps<Link>>
>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useButton({
    props,
    elementType: "a",
    forwardedRef,
  });

  return <Link {...buttonProps} ref={buttonRef} />;
});
```

## Overriding Styles

As all styles are in a CSS Layer named `sys42`, you can easily override the styles by adding your own styles without a layer or in a layer with a higher priority.

If you want to overide styles globally, the easiest way is to do this by overriding custom properties. You can find a list of all available customer properties in the defaults file [`default-custom-properties.css`](./lib/default-custom-properties.css).

If you want to override styles for a specific occurence of a component, you can do this by adding a class to the component and then adding styles to this class.

## Styling opinions

System 42 is designed to be a flexible design system that can be customized to fit your needs.

There are some opinionated decisions that are made in the design system:

**Margin Top**

Whenever `margin` is used to create space between elements, `margin-top` is preferred. The the CSS reset (which is base on `normalize.css`) is extended and removes `margin-top` for some elements.

For more information see this [article](https://dev.to/receter/why-i-fell-in-love-with-margin-top-3flg).

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
