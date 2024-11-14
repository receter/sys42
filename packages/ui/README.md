# System 42 UI

System 42 is a design system for building consistent and accessible web applications. This package contains components and styles that can easily be used in React applications.

## Installation

```bash
npm install @sys42/ui
```

## Usage

### Styled React Components

Using the styled React components is the easiest way to work with System 42.

Every component imports an individual `.css` file with default styles based on a set of CSS custom properties. You can make use of the exposed CSS custom properties to customize the look of the components.

You can find all available custom properties here: [default-custom-properties.css](./lib/default-custom-properties.css)

> [!NOTE]
> If you need to customize the styles beyond the exposed custom properties, you should make use of the Base Hooks and style the components yourself. You can read more about using the Base Hooks in the [Using the Base Hooks](#using-the-base-hooks) section.

The component styles depend on `base.css` for CSS normalization and basic styles, and on `default-custom-properties.css` for custom property defaults. To ensure these dependencies are met, import both `base.css` and `default-custom-properties.css` in your application.

All styles as well as the custom properties are inside a [CSS Layer](https://www.w3.org/TR/css-cascade-5/#layering)
named `sys42`.

#### Example

```jsx
// Add these imports to your main file
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

```jsx
import { Button, TextInput, Stack } from "@sys42/ui";

function App() {
  return (
    <Stack>
      <TextInput placeholder="Type something" />
      <Button>Click me</Button>
    </Stack>
  );
}
```

### Using the Component Hooks

For all components, there are hooks available that can be used to change how the component is rendered. The hooks are named the same as the components but with a `use` prefix. The main use case for the hooks is to change the element type of the component.

For example you can use the `useButton` hook and spread the returned `buttonProps` on a `Link` component.

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

### Using the Base Hooks

In addition to the React components and [Component Hooks](#using-the-component-hooks), there are Base Hooks that can be used in case you want to opt out of the default styling.

Base Hooks do not import any CSS and have no style-related props, such as the `variant` prop for styled buttons.

The hooks are named the same as the components but with a `useBase…` prefix. The hooks return everything you need to render the component. You can refer to implementation of the Component Hooks like `useButton` to for examples on how to use the Base Hooks.

#### Simple Usage

This is the most basic way to use a Base Hook. It will render the default internal markup and only change the element type and/or modify the attributes of the wrapper element.

```jsx
import { useBaseFoobar } from "@sys42/ui";

export const MyFoobar = forwardRef<
  HTMLDivElement,
  ButtonProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { foobarProps, foobarRef } = useBaseFoobar({
    props,
    elementType: "div",
    forwardedRef,
  });

  // If you want to attach a CSS class to the component
  // you can do this by simply mutating the className
  foobarProps.className = "btn btn-blue";

  return <div {...foobarProps} ref={foobarRef} />;
};
```

#### Advanced Usage

Some components that render more complex markup might give you advanced control over the rendered markup by returning additional props that allow you to customize the rendered markup. In this cases you can choose to either use the returned props or ignore them in favor of the default children.

```jsx
import { useBaseFoobar } from "@sys42/ui";

export const MyComplexThing = forwardRef<
  HTMLDivElement,
  ButtonProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const {
    complexThingProps,
    complexThingRef,
    internalThingProps,
    internalThingRef,
    readTheDocs
  } = useBaseComplexThing({
    props,
    elementType: "div",
    forwardedRef,
  });

  // To render the default markup you can simply spread the props
  // which will contain children with the default markup

  // return <div {...complexThingProps} ref={complexThingRef} />;

  // If you want to render custom markup you can do this by
  // recreating the component with the help of the returned variables.
  // It might be a good idea to read the documentation of the component
  // to understand the requirements of the custom markup.

  return (
    <div {...complexThingProps} ref={complexThingRef}>
      <nav {...internalThingProps} ref={internalThingRef} />
      {readTheDocs}
    </div>
  );
};
```

## Custom Properties

You can find all available custom properties here: [default-custom-properties.css](./lib/default-custom-properties.css)

All custom properties are prefixed with `--sys42-`.

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
