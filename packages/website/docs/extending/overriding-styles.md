---
sidebar_position: 6
---

# Overriding styles

As all component styles are in a CSS layer named `sys42` (and the base styles in `sys42-base`), you can override them by adding your own styles without a layer, or in a layer with a higher priority. Unlayered CSS always wins over layered CSS, regardless of specificity.

## Globally: tokens

If you want to change the look globally, the easiest way is to override tokens: semantic tokens for system-wide decisions, family tokens for a group of components. See the [token reference](../tokens/semantic-tokens.mdx) and the [families](../tokens/families.md).

```css
:root {
  /* every control radius */
  --s42-radius-control: 999px;
  /* only the Button family */
  --button-fontWeight: 600;
}
```

## Locally: a class

If you want to override styles for a specific occurrence of a component, add a class to the component and style that class. Your class is unlayered, so it wins:

```css
.wide-button {
  width: 100%;
}
```

```jsx live
<Stack>
  <Button className="wide-button" style={{ width: "100%" }}>
    Full width
  </Button>
  <Button>Default width</Button>
</Stack>
```

Family tokens can also be set on a single instance, which keeps the component's own hover and active handling intact:

```jsx live
<Button style={{ "--button-background": "#ffd166", "--button-color": "#2b2d42" }}>
  Custom colors
</Button>
```

## Completely: base hooks

If the tokens are not enough, use the [base hooks](./base-hooks.md) and write the styles yourself. The behaviour and accessibility stay, the CSS is yours.

## Styling opinions

System 42 is built as a flexible design system, allowing you to customize it to suit your needs. However, it includes a few opinionated design choices.

**Margin top.** Whenever `margin` is used to create space between elements, `margin-top` is preferred. The CSS reset (which is based on `normalize.css`) is extended and removes the margin of headings, paragraphs, lists and a few other elements. Read [why margin-top](https://dev.to/receter/why-i-fell-in-love-with-margin-top-3flg).
