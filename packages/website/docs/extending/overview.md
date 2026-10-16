---
sidebar_position: 1
---

# Overview

Every component of `@sys42/ui` is built in layers, and every layer is exported. That is the main idea behind the library: you decide how much of it you use.

| Layer | Export | What you get |
| --- | --- | --- |
| Styled component | `Button` | The ready-to-use React component with the default styles |
| Component hook | `useButton` | The same component, including styles, but you render the element |
| Base hook | `useBaseButton` | Behaviour and accessibility only, no CSS, no style props |

A component folder in the library looks like this:

1. `useBaseButton.ts` handles the unstyled behaviour. It takes the component's props, splits the custom props off, and returns `elementProps` to spread onto the element and `elementRef` to attach to it.
2. `useButton.ts` adds the styled layer. It extracts style props such as `variant` and `size` and adds the CSS Module classes.
3. `Button.tsx` is built with `createComponent`, which wraps `forwardRef` and types the props as the intrinsic element's props plus the custom props.

Styled components are the easiest way to work with System 42. Use the [component hooks](./simple-and-complex-components.md) when you need to change the element a component renders, for example to render a button as a router link. Use the [base hooks](./base-hooks.md) when you want to opt out of the default styling and write your own.

```jsx live
function Demo() {
  // useButton returns the props of a styled button, you decide where they go
  const ButtonSpan = createComponent("span", (hookOptions) => {
    const { elementProps, elementRef } = useButton(hookOptions);
    return <span {...elementProps} ref={elementRef} role="button" tabIndex={0} />;
  });

  return (
    <Stack>
      <Button variant="accent">A real button</Button>
      <ButtonSpan variant="accent">A span that looks like one</ButtonSpan>
    </Stack>
  );
}
```
