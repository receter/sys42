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
named `sys42`. The base styles, defined in `base.css`, are inside a layer named `sys42-base`.

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

#### Simple Components

For simple components that render a single element, like a button, simply spread the returned `elementProps` and attach the `elementRef` to the element.

```jsx
import { Link } from "react-router-dom";
import { createComponent, useButton } from "@sys42/ui";

export const ButtonLink = createComponent<ButtonProps, "a">("a", (hookOptions) => {
  const { elementProps, elementRef } = useButton(hookOptions);
  return <Link {...elementProps} ref={elementRef} />;
});
```

#### Complex Components

For more complex components that render multiple elements, you'll need to invoke an additional render function to handle the children. The hook will return a `renderArgs` object, which must be passed to the render function. You can either use the default render function provided for each component or write your own.

```jsx
import {
  FormFieldProps,
  createComponent,
  useFormField,
  renderFormField,
} from "@sys42/ui";

export const MyFormField = createComponent<FormFieldProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useFormField(hookOptions);

    return (
      <div {...elementProps} ref={elementRef}>
        {renderFormField(renderArgs)}
      </div>
    );
  }
);
```

### Using the Base Hooks

"In addition to React components and [Component Hooks](#using-the-component-hooks), the library provides Base Hooks for cases where you want to opt out of default styling.

Base Hooks don’t include any CSS and omit style-related props, such as the `variant` prop in styled buttons. These hooks are prefixed with `useBase…` and return everything needed to render the component.

For guidance on using Base Hooks, you can refer to the implementation of the corresponding Component Hook like `useButton`.

Here’s a simple example of using a Base Hook to create a custom styled component:

```jsx
import {
  BaseFormFieldProps,
  createComponent,
  useBaseFormField,
  renderFormField,
  ExactProps,
} from "@sys42/ui";

import { cn } from "@sys42/utils";

type MyFormFieldProps = BaseFormFieldProps & {
  myProp: boolean;
};

function useMyFormField<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<MyFormFieldProps, TTagName>
) {
  // The custom prop "myProp" is extracted from the props
  const { myProp, ...baseProps } = options.props;

  return useBaseFormField(
    {
      ...options,
      props: baseProps satisfies ExactProps<
        BaseFormFieldProps,
        MyFormFieldProps
      >,
    },
    (draft) => {
      // You can modify the formField here
      draft.elementProps.className = cn(
        draft.elementProps.className,
        "my-form-field"
      );

      if (myProp) {
        draft.elementProps.className += " my-form-field--my-prop";
      }

      draft.labelProps.className = cn(
        draft.labelProps.className,
        "my-form-field-label"
      );
    }
  );
}

export const MyFormField = createComponent<MyFormFieldProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } =
      useMyFormField(hookOptions);

    return (
      <div {...elementProps} ref={elementRef}>
        {renderFormField(renderArgs)}
      </div>
    );
  }
);
```

## Types

Read more about the types in the [Type Strategy](./TypeStrategy.md) document.

## Custom Properties

You can find all available custom properties here: [default-custom-properties.css](./lib/default-custom-properties.css)

All custom properties are prefixed with `--sys42-`.

## Overriding Styles

As all styles are in a CSS Layer named `sys42`, you can easily override the styles by adding your own styles without a layer or in a layer with a higher priority.

If you want to overide styles globally, the easiest way is to do this by overriding custom properties. You can find a list of all available customer properties in the defaults file [`default-custom-properties.css`](./lib/default-custom-properties.css).

If you want to override styles for a specific occurence of a component, you can do this by adding a class to the component and then adding styles to this class.

## Styling opinions

System 42 is built as a flexible design system, allowing you to customize it to suit your needs. However, it includes a few opinionated design choices:

**Margin Top**

Whenever `margin` is used to create space between elements, `margin-top` is preferred. The the CSS reset (which is base on `normalize.css`) is extended and removes `margin` for some elements.

For more information see this [article](https://dev.to/receter/why-i-fell-in-love-with-margin-top-3flg).
