---
sidebar_position: 3
---

# Theme scope

## Nested themes

Semantic tokens can be overridden on any element with ordinary selectors. No theme boundary attribute is needed: components resolve their fallbacks on their own element.

```css
:root {
  --s42-color-control: #eeeeee;
  --s42-color-onControl: #111111;
}

.sidebar {
  --s42-color-control: #333333;
  --s42-color-onControl: #ffffff;
}
```

Default buttons inside `.sidebar` use the sidebar colors, buttons outside use the root colors.

```jsx live
<Stack>
  <Button>Root theme</Button>
  <div
    className={classCard}
    style={{
      "--s42-color-control": "#333333",
      "--s42-color-onControl": "#ffffff",
      "--s42-color-surfaceBright": "#f1f5f9",
    }}
  >
    <Stack>
      <p>A nested theme: tokens overridden on this card.</p>
      <Button>Nested theme</Button>
      <TextInput placeholder="Field on the nested surface" />
    </Stack>
  </div>
</Stack>
```

Override the semantic tokens themselves at the scope where you need them. Changing a primitive in a descendant (e.g. `.sidebar { --color-primary-90: … }`) does **not** update semantic tokens that already resolved on `:root`. The same applies to your own aliases: a family token set to `var(--acme-brand)` resolves where you declare it.

## Family tokens: global, subtree and instance

```css
:root {
  --button-radius: 6px;
}

.toolbar {
  --button-radius: 0;
}

.special-button {
  --button-radius: 999px;
}
```

Normal inheritance and cascade decide which value wins. A family token you set keeps applying inside nested semantic themes until a closer declaration replaces it. Theme changes don't reset your family configuration.

```jsx live
<div style={{ "--button-radius": "0" }}>
  <div className={classButtonGroup}>
    <Button>Subtree: square</Button>
    <Button style={{ "--button-radius": "999px" }}>Instance: round</Button>
  </div>
</div>
```

## Variants

Color tokens are variant specific. `--button-background` only applies to the default variant and is not a fallback for `--button-accent-background`, which falls back to `--s42-color-controlAccent` directly. Size and shape tokens such as `--button-radius` and `--button-paddingX` are shared by all variants. The `lg` size uses the padding × 1.5.

Hover, active, highlighted, checked and disabled colors are derived internally from the resolved colors (e.g. hover mixes 8% of the text color into the background) or come from semantic tokens. There are no public state-color tokens.

```jsx live
<div style={{ "--button-background": "#fde68a", "--button-radius": "2px" }}>
  <div className={classButtonGroup}>
    <Button>Default: new background</Button>
    <Button variant="accent">Accent: unchanged color, shared radius</Button>
  </div>
</div>
```
