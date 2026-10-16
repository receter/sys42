---
sidebar_position: 2
---

# Component hooks

For all components there are hooks that can be used to change how the component is rendered. The hooks are named like the components, with a `use` prefix. The main use case is to change the element type of the component.

The hooks are meant to be used with `createComponent`, which wraps `forwardRef` and types the props as the intrinsic element's props plus the custom props of the component (see the [type strategy](./type-strategy.md)). The first argument is the default element type, the second a render function that receives the hook options.

## Simple components

For simple components that render a single element, like a button, spread the returned `elementProps` and attach the `elementRef` to the element:

```jsx
import { Link } from "react-router-dom";
import { ButtonProps, createComponent, useButton } from "@sys42/ui";

export const ButtonLink = createComponent<ButtonProps, "a">("a", (hookOptions) => {
  const { elementProps, elementRef } = useButton(hookOptions);
  return <Link {...elementProps} ref={elementRef} />;
});
```

`elementProps` is typed for the element you pass to `createComponent`. When you spread the props onto a different element, TypeScript warns about props the element does not support, and the same is true for `elementRef`.

## Complex components

More complex components render multiple elements. Their hooks return an additional `renderArgs` object, which must be passed to a render function that handles the children. You can use the default render function provided for each component or write your own:

```jsx
import { createComponent, FormFieldProps, renderFormField, useFormField } from "@sys42/ui";

export const MyFormField = createComponent<FormFieldProps, "div">("div", (hookOptions) => {
  const { elementProps, elementRef, renderArgs } = useFormField(hookOptions);

  return (
    <div {...elementProps} ref={elementRef}>
      {renderFormField(renderArgs)}
    </div>
  );
});
```

Components with a render function: `FormField`, `FormFieldSet`, `LabeledControl`, `Message`, `Listbox`, `OverflowMenu`, `SplitButton` and `MenuButton`.

```jsx live
function Demo() {
  // A FormField rendered as a <section> with the default render function
  const SectionField = createComponent("section", (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useFormField(hookOptions);
    return (
      <section {...elementProps} ref={elementRef}>
        {renderFormField(renderArgs)}
      </section>
    );
  });

  return (
    <SectionField label="Rendered as a section">
      {({ htmlFor }) => <TextInput id={htmlFor} />}
    </SectionField>
  );
}
```
