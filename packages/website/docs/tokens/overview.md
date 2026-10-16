---
sidebar_position: 1
---

# Design tokens and theming

System 42 styles are configured with CSS custom properties, organized in three token layers. Theming is CSS only: there is no ThemeProvider and no theming prop.

| Layer | Purpose | Examples | Availability |
| --- | --- | --- | --- |
| Primitive | Raw values and scales | `--color-primary-90`, `--space-md`, `--radius-sm` | Only if your project loads them (native or your own) |
| Semantic | System-wide design decisions | `--s42-color-control`, `--s42-radius-control` | Guaranteed by every valid sys42 integration |
| Family | Optional configuration of one component family | `--button-background`, `--input-radius` | Unset unless you set them |

Components also use private `--_*` variables (e.g. `--_color`) internally. They are not an API: don't set or read them.

```jsx live
<Stack>
  <Button variant="accent">Native theme</Button>
  <div style={{ "--s42-color-controlAccent": "#1d4ed8", "--s42-color-onControlAccent": "#fff" }}>
    <Button variant="accent">Semantic token override</Button>
  </div>
  <div style={{ "--button-accent-background": "#15803d", "--button-radius": "999px" }}>
    <Button variant="accent">Family token override</Button>
  </div>
</Stack>
```

## Naming

Hyphens only separate segments, and each segment is a single camelCase word: `borderWidth`, `controlX`, `onSurface`, `borderColor`. Names have two or three segments after the `--`.

**Semantic tokens and primitives:** `--(s42-){category}-{name}-{modifier}`

- **`s42-`** is the prefix of semantic tokens. Primitives have no prefix.
- **`{category}`** is the kind of value: `color`, `space`, `radius`, `borderWidth`, `fontSize`, …
- **`{name}`** is the role or scale: `surfaceBright`, `controlX`, `fieldMinWidth`, `primary`.
- **`{modifier}`** is optional: the same usage in another variant or size, such as `-muted`, `-compact`, `-strong`, or a scale step like `-md` or `-40`.

**Family tokens:** `--{family}-{variant}-{property}`

- **`{family}`** is the component family: `button`, `input`, `menuItem`.
- **`{variant}`** is optional: the variant or state the token applies to, such as `accent`, `success`, `placeholder` or `selected`. Without it, the token applies to the default variant (colors) or to all variants (sizes and shapes).
- **`{property}`** always comes last: `color`, `background`, `borderColor`, `paddingX`. It reads like the CSS declaration: `--button-accent-color` is the `color` of the accent button.

| Layer | Examples |
| --- | --- |
| Semantic | `--s42-space-controlX`, `--s42-color-onSurface-muted`, `--s42-borderWidth-field-strong` |
| Family | `--button-color`, `--button-accent-color`, `--input-placeholder-color`, `--menuItem-selected-fontWeight` |
| Primitive | `--color-primary-40`, `--space-md`, `--fontSize-sm`, `--easing-inOut` |

The private `--_*` variables inside components don't follow this scheme (`--_padding-x`); they are not an API. The build fails if a token name in the library has more than three segments or a segment that isn't camelCase.

## Which tokens can I use in my CSS?

**Semantic tokens** (`--s42-*`) are guaranteed by your sys42 integration. Use them when your styles should follow system-wide design decisions.

**Your chosen primitives** are provided by your project. You can use the sys42 native primitives or your own primitives directly in your CSS, as long as you keep loading their definitions. Using sys42 components does not mean the native primitives exist: a custom integration can replace them entirely.

**Family tokens** are optional configuration. Set them to customize the members of a family. Don't read them as guaranteed values in unrelated styles: unset family tokens fall back to semantic tokens inside each component, so they usually have no value of their own.

| Token set | sys42 component CSS | Your CSS |
| --- | --- | --- |
| Semantic tokens | Guaranteed integration contract | Guaranteed integration contract |
| Native primitives | Never used | Valid while you load `primitive-tokens.css` |
| Your own primitives | Never used | Valid while you define them |
| Family tokens | Only its own family, always with a semantic fallback | Set them to configure that family; not guaranteed values |

```css
/* Your own definitions */
:root {
  --acme-space-md: 0.75rem;
  --acme-radius-sm: 4px;
}

.my-panel {
  padding: var(--acme-space-md);
  background: var(--s42-color-surface);
  color: var(--s42-color-onSurface);
}

/* Applies to all Button-family members that use this token */
:root {
  --button-radius: var(--acme-radius-sm);
}
```

This excerpt is not a complete semantic mapping. See [Setup](./setup.md) for a complete integration.
