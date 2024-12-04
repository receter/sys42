## Prop Validation for Components

Props for `sys42` components combine the intrinsic element’s supported props with custom props defined by the library. If a library-defined prop overlaps with an intrinsic prop, the library’s definition serves as the interface.

To get the props type for a `sys42` component, you can use the type utility `Sys42Props`. It merges the intrinsic element’s props with the custom props defined by the library. The utility uses `Omit` to exclude custom props from the intrinsic element’s props before merging the two types to avoid conflicts and prefer the library’s definition.

```typescript
type Sys42Props<Props, TagName extends HTMLElementTagName> = Omit<
  React.ComponentPropsWithoutRef<TagName>,
  keyof Props
> &
  Props;
```

## Safely Filter Custom Props

Now we have a type that combines the intrinsic element’s props with the library-defined props. Consequently, these props must be split up in order to distinguish between props that are to be passed on to the intrinsic element and props that are to be handled by the library.

For this purpose, the incoming props are typed as an object with only the props defined by the library. So if all the library-defined props are extracted from the incoming props, what remains, in TypeScripts eyes is an empty object. In reality it contains all the props we want to pass on to the intrinsic element.

This way we can use `satisfies EmptyObject` to ensure we did split the props correctly.

And we can safely cast it to `React.ComponentPropsWithoutRef<TagName>` without any risk of including custom props.

```typescript
const { hello, world, ...restProps } = props;

const elementProps =
  restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>;
```

At this point `TagName` is not known and `elementProps` will have a type that only includes props that all potential intrinsic elements support.

To set attributes that are specific to a certain element, it is necessary check the `elementType` to narrow the type. The helper function `isPropsForElement` can be used for this purpose.

```typescript
if (isPropsForElement(elementProps, elementType, "a")) {
  // at this point the type of elementProps is narrowed to React.ComponentPropsWithoutRef<"a">
  // we can safely set the href attribute for example
  elementProps.href = "https://google.com";
}
```

## Warn on Wrong Props and Ref Type

Later the returned `elementProps` will know about the element type. When the props are spread onto the intrinsic element, TypeScript will warn if any of the props are not supported by the element.

The same is also true for the `elementRef` returned by a `useComponent` hook. If the element is not of the correct type, TypeScript will warn.

## Ensure Correct Ref Types

When using a `useComponent` hook, the returned `ref` must match the specified DOM element type. This is achieved by using the tag name as a generic argument in the hook:

```tsx
export const Button = createComponent<ButtonProps, "button">(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useButton(hookOptions);
    return <a {...elementProps} ref={elementRef} />;
    //                          ~~~ Type 'ForwardedRef<HTMLButtonElement>'
    // is not assignable to type 'LegacyRef<HTMLAnchorElement> | undefined'.
  },
);
```
