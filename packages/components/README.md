# System42 Components

## Architecture

Todo: Describe the architecture of the design system.

## Styling and Theming

## Using the hooks

## The `as` prop

Components in the design system can use the `as` prop to render as a different HTML element (or component).

## Ref forwarding

Components can but do not have to forward refs to allow using the `ref` prop to access the underlying DOM element.

**known issues**
Passing a ref might not work when using the `as` prop with a component that
does not support a ref to the underlying DOM element.

Also the type of the ref is not yet correct when using the `as` prop. Here is an article that explains forwarding refs for polymorphic React components in TypeScript: https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

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
