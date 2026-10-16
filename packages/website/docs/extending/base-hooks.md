---
sidebar_position: 3
---

# Base hooks

In addition to the React components and the [component hooks](./simple-and-complex-components.md), the library provides base hooks for cases where you want to opt out of the default styling.

Base hooks don't include any CSS and omit style-related props, such as the `variant` prop of the styled button. They are prefixed with `useBase…` and return everything needed to render the component.

For guidance on using base hooks, refer to the implementation of the corresponding component hook, such as `useButton`: the styled hook is nothing more than the base hook plus an interceptor that adds class names.

## The interceptor

Every base hook accepts a second argument, the interceptor. It receives a `draft` of what the hook is about to return (`elementProps` and, for complex components, the props of the inner elements such as `labelProps`) and may modify it in place. This is where the styled hooks add their class names, and where you add yours.

Here is a simple example of using a base hook to create a custom styled component:

```tsx
import {
  BaseFormFieldProps,
  createComponent,
  ExactProps,
  renderFormField,
  useBaseFormField,
} from "@sys42/ui";
import { cn } from "@sys42/utils";

type MyFormFieldProps = BaseFormFieldProps & {
  myProp: boolean;
};

function useMyFormField<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<MyFormFieldProps, TTagName>,
) {
  // The custom prop "myProp" is extracted from the props
  const { myProp, ...baseProps } = options.props;

  return useBaseFormField(
    {
      ...options,
      props: baseProps satisfies ExactProps<BaseFormFieldProps, MyFormFieldProps>,
    },
    (draft) => {
      // You can modify the formField here
      draft.elementProps.className = cn(draft.elementProps.className, "my-form-field");

      if (myProp) {
        draft.elementProps.className += " my-form-field--my-prop";
      }

      draft.labelProps.className = cn(draft.labelProps.className, "my-form-field-label");
    },
  );
}

export const MyFormField = createComponent<MyFormFieldProps, "div">("div", (hookOptions) => {
  const { elementProps, elementRef, renderArgs } = useMyFormField(hookOptions);

  return (
    <div {...elementProps} ref={elementRef}>
      {renderFormField(renderArgs)}
    </div>
  );
});
```

`satisfies ExactProps<BaseFormFieldProps, MyFormFieldProps>` makes sure that every custom prop was extracted before the rest is passed to the base hook. The [type strategy](./type-strategy.md) explains why.

## Live example

The unstyled button keeps the behaviour (it is a real `<button>`, with `disabled` and the ref handling) but none of the styles, so the inline styles below are all there is:

```jsx live
function Demo() {
  const PlainButton = createComponent("button", (hookOptions) => {
    const { elementProps, elementRef } = useBaseButton(hookOptions, (draft) => {
      draft.elementProps.style = {
        padding: "0.5rem 1rem",
        border: "2px dashed var(--s42-color-outline)",
        borderRadius: "999px",
        background: "transparent",
        font: "inherit",
        cursor: "pointer",
      };
    });
    return <button {...elementProps} ref={elementRef} />;
  });

  return (
    <Stack>
      <Button>Styled</Button>
      <PlainButton>Base hook, own styles</PlainButton>
    </Stack>
  );
}
```
