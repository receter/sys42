# Design Tokens and Theming

System 42 styles are configured with CSS custom properties, organized in three token layers. Theming is CSS only: there is no ThemeProvider and no theming prop.

| Layer     | Purpose                                        | Examples                                          | Availability                                         |
| --------- | ---------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Primitive | Raw values and scales                          | `--color-indigo-100`, `--space-md`, `--radius-sm` | Only if your project loads them (native or your own) |
| Semantic  | System-wide design decisions                   | `--s42-color-control`, `--s42-radius-control` | Guaranteed by every valid sys42 integration          |
| Family    | Optional configuration of one component family | `--button-background`, `--input-radius`           | Unset unless you set them                            |

Components also use private `--_*` variables (e.g. `--_color`) internally. They are not an API: don't set or read them.

## Which tokens can I use in my CSS?

**Semantic tokens** (`--s42-*`) are guaranteed by your sys42 integration. Use them when your styles should follow system-wide design decisions.

**Your chosen primitives** are provided by your project. You can use the sys42 native primitives or your own primitives directly in your CSS, as long as you keep loading their definitions. Using sys42 components does not mean the native primitives exist: a custom integration can replace them entirely.

**Family tokens** are optional configuration. Set them to customize the members of a family. Don't read them as guaranteed values in unrelated styles: unset family tokens fall back to semantic tokens inside each component, so they usually have no value of their own.

| Token set           | sys42 component CSS                                  | Your CSS                                                 |
| ------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| Semantic tokens     | Guaranteed integration contract                      | Guaranteed integration contract                          |
| Native primitives   | Never used                                           | Valid while you load `primitive-tokens.css`              |
| Your own primitives | Never used                                           | Valid while you define them                              |
| Family tokens       | Only its own family, always with a semantic fallback | Set them to configure that family; not guaranteed values |

```css
/* Your own definitions */
:root {
  --acme-space-md: 0.75rem;
  --acme-radius-sm: 4px;
}

.my-panel {
  padding: var(--acme-space-md);
  background: var(--s42-color-container);
  color: var(--s42-color-on-container);
}

/* Applies to all Button-family members that use this token */
:root {
  --button-radius: var(--acme-radius-sm);
}
```

This excerpt is not a complete semantic mapping. See [Setup](#setup) for a complete integration.

## Setup

All sys42 styles are in the CSS layer `sys42` (base styles in `sys42-base`), so your unlayered CSS always wins over the defaults.

### Native theme

Import `base.css` and the native tokens:

```js
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
```

`default-custom-properties.css` is a convenience entry point that loads both definition files. You can also import them explicitly, with the same result:

```js
import "@sys42/ui/primitive-tokens.css";
import "@sys42/ui/semantic-tokens.css";
```

`semantic-tokens.css` maps every semantic token to a native primitive and does **not** import the primitives itself, so don't load it on its own.

To adjust the native theme, override semantic tokens (or family tokens) in your own CSS:

```css
:root {
  --s42-color-control-accent: #0b6e4f;
  --s42-radius-control: 999px;
}
```

### Your own primitives

If your project has its own primitives, don't import `default-custom-properties.css`, `primitive-tokens.css` or `semantic-tokens.css`. Instead, define your primitives and map **every** semantic token listed in the [semantic token reference](#semantic-tokens) to them:

```js
import "@sys42/ui/base.css";
import "./acme-tokens.css";
```

```css
/* acme-tokens.css (excerpt) */
:root {
  --acme-spacing-300: 0.75rem;
  --acme-corner-rounded: 0.5rem;

  --s42-space-control-x: var(--acme-spacing-300);
  --s42-radius-control: var(--acme-corner-rounded);
  /* ...and all other --s42-* tokens */
}
```

An incomplete mapping is an invalid integration: components would render with missing values. Use the [mapping check](#checking-your-mapping) to find gaps.

### Checking your mapping

`@sys42/ui` ships a reporting-only CLI that compares your CSS with the semantic token inventory of the installed version:

```bash
# Complete custom mapping: reports missing, renamed, removed and unknown tokens
npx sys42-check-tokens src/styles/acme-tokens.css

# Native theme with a few overrides: skips the "missing" check
npx sys42-check-tokens --overrides src/styles/theme.css
```

It reports:

- required semantic tokens your mapping doesn't declare (not with `--overrides`)
- renamed tokens, with the new name
- removed tokens, with migration guidance
- unknown `--s42-*` names

It only checks `--s42-*` names in declarations and `var()` references. Your own primitives and family tokens are never reported. It never changes your files, and exits with `1` if it found something.

Limits: it is a static text check. Declaring a token doesn't prove that it resolves to a valid value at runtime, in every theme scope, or that your `var()` references point to defined primitives. Renames and removals come from explicit migration metadata (`token-migrations.json`), never from similar names. The inventory is also published as `@sys42/ui/semantic-tokens.json`.

## Theme scope

### Nested themes

Semantic tokens can be overridden on any element with ordinary selectors. No theme boundary attribute is needed: components resolve their fallbacks on their own element.

```css
:root {
  --s42-color-control: #eeeeee;
  --s42-color-on-control: #111111;
}

.sidebar {
  --s42-color-control: #333333;
  --s42-color-on-control: #ffffff;
}
```

Default buttons inside `.sidebar` use the sidebar colors, buttons outside use the root colors.

Override the semantic tokens themselves at the scope where you need them. Changing a primitive in a descendant (e.g. `.sidebar { --color-indigo-100: … }`) does **not** update semantic tokens that already resolved on `:root`. The same applies to your own aliases: a family token set to `var(--acme-brand)` resolves where you declare it.

### Family tokens: global, subtree and instance

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

### Variants

Color tokens are variant specific. `--button-background` only applies to the default variant and is not a fallback for `--button-background-primary`, which falls back to `--s42-color-control-accent` directly. Size and shape tokens such as `--button-radius` and `--button-padding-x` are shared by all variants. The `lg` size uses the padding × 1.5.

Hover, active, highlighted, checked and disabled colors are derived internally from the resolved colors (e.g. hover mixes 8% of the text color into the background) or come from semantic tokens. There are no public state-color tokens.

## Families

Every component belongs to exactly one family and reads only that family's tokens. Each token falls back to the listed semantic token. A fallback of `transparent` or `inherit` means "no decoration" by default.

### Button

Members: `Button`, `ButtonA`, `SplitButton`, `MenuButton`, `OverflowMenu` (trigger).

| Token                           | Fallback                                                           | Value            | Scope                   | Used by                                  |
| ------------------------------- | ------------------------------------------------------------------ | ---------------- | ----------------------- | ---------------------------------------- |
| `--button-background`           | `--s42-color-control`                                            | color            | default variant         | all                                      |
| `--button-color`                | `--s42-color-on-control`                                         | color            | default variant         | all                                      |
| `--button-border-color`         | `transparent`                                                      | color            | default variant         | Button, SplitButton, MenuButton          |
| `--button-background-primary`   | `--s42-color-control-accent`                                     | color            | primary                 | Button, SplitButton, MenuButton          |
| `--button-color-primary`        | `--s42-color-on-control-accent`                                  | color            | primary                 | Button, SplitButton, MenuButton          |
| `--button-border-color-primary` | `transparent`                                                      | color            | primary                 | Button, SplitButton, MenuButton          |
| `--button-background-danger`    | `--s42-color-danger`                                             | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-color-danger`         | `--s42-color-on-danger`                                          | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-border-color-danger`  | `transparent`                                                      | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-border-width`         | `--s42-border-width-control`                                     | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-radius`               | `--s42-radius-control`                                           | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-padding-x`            | `--s42-space-control-x`                                          | length           | all variants (lg × 1.5) | Button, SplitButton, MenuButton          |
| `--button-padding-y`            | `--s42-space-control-y`                                          | length           | all variants (lg × 1.5) | all (OverflowMenu: padding on all sides) |
| `--button-font-size`            | `--s42-font-size-control`                                        | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-font-weight`          | `--s42-font-weight-control`                                      | font-weight      | all variants            | Button, SplitButton, MenuButton          |
| `--button-line-height`          | `inherit`                                                          | line-height      | all variants            | all                                      |
| `--button-divider`              | `--s42-border-width-control solid --s42-color-control-divider` | border shorthand | all variants            | SplitButton                              |

The popup menus of SplitButton, MenuButton and OverflowMenu use the overlay semantic tokens (`--s42-color-overlay`, `--s42-shadow-overlay`, `--s42-radius-overlay`, …).

### Input

Members: `TextInput`, `TextArea`, `Select`, `Listbox`.

| Token                       | Fallback                             | Value       | Used by |
| --------------------------- | ------------------------------------ | ----------- | ------- |
| `--input-background`        | `--s42-color-field`                | color       | all     |
| `--input-color`             | `--s42-color-on-field`             | color       | all     |
| `--input-border-color`      | `--s42-color-field-border`         | color       | all     |
| `--input-border-width`      | `--s42-border-width-field`         | length      | all     |
| `--input-radius`            | `--s42-radius-field`               | length      | all     |
| `--input-padding-x`         | `--s42-space-field-x`              | length      | all     |
| `--input-padding-y`         | `--s42-space-field-y`              | length      | all     |
| `--input-line-height`       | `inherit`                            | line-height | all     |
| `--input-color-placeholder` | `--s42-color-placeholder-on-field` | color       | Listbox |
| `--input-min-width`         | `--s42-size-field-min-width`       | length      | Listbox |

Disabled Select and Listbox use `--s42-color-control-disabled` and `--s42-color-on-control-disabled`.

### Menu item

Members: `OverflowMenuItem`, `SplitButtonItem`, `MenuButtonItem`, `ListboxItem`.

| Token                              | Fallback                       | Value       | Used by     |
| ---------------------------------- | ------------------------------ | ----------- | ----------- |
| `--menu-item-padding-x`            | `--s42-space-item-x`         | length      | all         |
| `--menu-item-padding-y`            | `--s42-space-item-y`         | length      | all         |
| `--menu-item-radius`               | `--s42-radius-item`          | length      | all         |
| `--menu-item-font-weight-selected` | `--s42-font-weight-emphasis` | font-weight | ListboxItem |

The highlight is derived from the item color and `--s42-color-overlay`. Disabled items use `--s42-color-disabled-on-overlay`.

### Checkbox

Members: `Checkbox`.

| Token                     | Fallback                            | Value  |
| ------------------------- | ----------------------------------- | ------ |
| `--checkbox-background`   | `--s42-color-field`               | color  |
| `--checkbox-border-color` | `--s42-color-field-border`        | color  |
| `--checkbox-border-width` | `--s42-border-width-field-strong` | length |
| `--checkbox-radius`       | `--s42-radius-field`              | length |

The size is `--s42-size-indicator`. Checked uses `--s42-color-control-accent` / `--s42-color-on-control-accent`, disabled uses `--s42-color-control-disabled` / `--s42-color-on-control-disabled`.

### Radio

Members: `Radio`.

| Token                  | Fallback                            | Value  |
| ---------------------- | ----------------------------------- | ------ |
| `--radio-background`   | `--s42-color-field`               | color  |
| `--radio-border-color` | `--s42-color-field-border`        | color  |
| `--radio-border-width` | `--s42-border-width-field-strong` | length |

Size, checked and disabled colors work like Checkbox.

### Message

Members: `Message`. Variants: default, `info`, `success`, `warning`, `error`.

| Token                            | Fallback                                 | Value  | Scope           |
| -------------------------------- | ---------------------------------------- | ------ | --------------- |
| `--message-background`           | `--s42-color-container-subtle`         | color  | default variant |
| `--message-color`                | `--s42-color-on-container-subtle`      | color  | default variant |
| `--message-border-color`         | `transparent`                            | color  | default variant |
| `--message-background-info`      | `--s42-color-info-container`           | color  | info            |
| `--message-color-info`           | `--s42-color-on-info-container`        | color  | info            |
| `--message-border-color-info`    | `transparent`                            | color  | info            |
| `--message-background-success`   | `--s42-color-success-container`        | color  | success         |
| `--message-color-success`        | `--s42-color-on-success-container`     | color  | success         |
| `--message-border-color-success` | `transparent`                            | color  | success         |
| `--message-background-warning`   | `--s42-color-warning-container`        | color  | warning         |
| `--message-color-warning`        | `--s42-color-on-warning-container`     | color  | warning         |
| `--message-border-color-warning` | `transparent`                            | color  | warning         |
| `--message-background-error`     | `--s42-color-danger-container`         | color  | error           |
| `--message-color-error`          | `--s42-color-on-danger-container`      | color  | error           |
| `--message-border-color-error`   | `transparent`                            | color  | error           |
| `--message-border-width`         | `--s42-border-width-container-compact` | length | all variants    |
| `--message-radius`               | `--s42-radius-container-compact`       | length | all variants    |
| `--message-font-size`            | `--s42-font-size-body-sm`              | length | all variants    |

### Card

Members: `classCard` (helper class).

| Token                 | Fallback                         | Value      |
| --------------------- | -------------------------------- | ---------- |
| `--card-background`   | `--s42-color-container`        | color      |
| `--card-color`        | `--s42-color-on-container`     | color      |
| `--card-border-color` | `--s42-color-container-border` | color      |
| `--card-border-width` | `--s42-border-width-container` | length     |
| `--card-radius`       | `--s42-radius-container`       | length     |
| `--card-box-shadow`   | `--s42-shadow-container`       | box-shadow |
| `--card-padding-x`    | `--s42-space-container-x`      | length     |
| `--card-padding-y`    | `--s42-space-container-y`      | length     |

### Stack

Members: `Stack`.

| Token             | Fallback               | Value  |
| ----------------- | ---------------------- | ------ |
| `--stack-spacing` | `--s42-space-gap-md` | length |

The `spacing` prop takes precedence over `--stack-spacing`.

### Families without public tokens

These families are styled through semantic tokens only: `Label`, `FormField`, `FormFieldSet`, `LabeledControl`, `CheckboxGroup` (with `CheckboxGroupItem`), `RadioGroup` (with `RadioGroupItem`), `TextLink` (with `TextLinkButton`), `classButtonGroup`. `Option` has no styles.

## Semantic tokens

Every valid integration defines all of these. The native default is the mapping in `semantic-tokens.css`. The machine-readable inventory is `@sys42/ui/semantic-tokens.json`.

Naming: `--s42-{category}-{role}-{variant}`. Colors follow three rules:

- **Pairs:** a background role and its foreground. `on-<background>` is the text and icon color for exactly that background token, including its variant: `--s42-color-control-accent` / `--s42-color-on-control-accent`. An `on-*` token always has a matching background token.
- **Foregrounds on another background:** a foreground color that is meant for a background but isn't its pair is named `<tone>-on-<background>`: `--s42-color-danger-on-container` is danger text on `--s42-color-container`. It is **not** `on-container-danger`, which would be the foreground of a `container-danger` background.
- **Other colors** of a role, such as borders, use a variant: `--s42-color-field-border`.

**Color: default container (page and card background and text)**

| Token                               | Native default              |
| ----------------------------------- | --------------------------- |
| `--s42-color-container`           | `var(--color-neutral-0)`    |
| `--s42-color-on-container`        | `var(--color-neutral-1000)` |
| `--s42-color-danger-on-container` | `var(--color-red-600)`      |
| `--s42-color-container-border`    | `var(--color-neutral-200)`  |

**Color: subtle container (default Message)**

| Token                               | Native default           |
| ----------------------------------- | ------------------------ |
| `--s42-color-container-subtle`    | `var(--color-mauve-50)`  |
| `--s42-color-on-container-subtle` | `var(--color-mauve-900)` |

**Color: overlay (menus and listbox popups)**

| Token                               | Native default                                                  |
| ----------------------------------- | --------------------------------------------------------------- |
| `--s42-color-overlay`             | `var(--color-neutral-0)`                                        |
| `--s42-color-on-overlay`          | `var(--color-neutral-1000)`                                     |
| `--s42-color-disabled-on-overlay` | `color-mix(in srgb, var(--color-neutral-900) 38%, transparent)` |
| `--s42-color-overlay-border`      | `transparent`                                                   |

**Color: controls (buttons)**

| Token                               | Native default                                                   |
| ----------------------------------- | ---------------------------------------------------------------- |
| `--s42-color-control`             | `var(--color-indigo-100)`                                        |
| `--s42-color-on-control`          | `var(--color-indigo-900)`                                        |
| `--s42-color-control-accent`      | `var(--color-indigo-600)`                                        |
| `--s42-color-on-control-accent`   | `var(--color-neutral-0)`                                         |
| `--s42-color-control-disabled`    | `color-mix(in srgb, var(--color-neutral-900) 12%, transparent)`  |
| `--s42-color-on-control-disabled` | `color-mix(in srgb, var(--color-neutral-900) 38%, transparent)`  |
| `--s42-color-control-divider`     | `color-mix(in srgb, var(--color-neutral-1000) 15%, transparent)` |

**Color: danger emphasis (filled danger button)**

| Token                     | Native default           |
| ------------------------- | ------------------------ |
| `--s42-color-danger`    | `var(--color-red-600)`   |
| `--s42-color-on-danger` | `var(--color-neutral-0)` |

**Color: fields (text inputs, selects, checkboxes, radios)**

| Token                                | Native default              |
| ------------------------------------ | --------------------------- |
| `--s42-color-field`                | `var(--color-neutral-0)`    |
| `--s42-color-on-field`             | `var(--color-neutral-1000)` |
| `--s42-color-placeholder-on-field` | `var(--color-neutral-600)`  |
| `--s42-color-field-border`         | `var(--color-neutral-200)`  |

**Color: status containers (Message variants)**

| Token                                | Native default            |
| ------------------------------------ | ------------------------- |
| `--s42-color-info-container`       | `var(--color-indigo-100)` |
| `--s42-color-on-info-container`    | `var(--color-indigo-900)` |
| `--s42-color-success-container`    | `var(--color-green-100)`  |
| `--s42-color-on-success-container` | `var(--color-green-900)`  |
| `--s42-color-warning-container`    | `var(--color-amber-100)`  |
| `--s42-color-on-warning-container` | `var(--color-amber-900)`  |
| `--s42-color-danger-container`     | `var(--color-red-100)`    |
| `--s42-color-on-danger-container`  | `var(--color-red-900)`    |

**Color: focus ring and links**

| Token                        | Native default            |
| ---------------------------- | ------------------------- |
| `--s42-color-focus`        | `var(--color-indigo-600)` |
| `--s42-color-link`         | `var(--color-blue-600)`   |
| `--s42-color-link-visited` | `var(--color-purple-700)` |
| `--s42-color-link-active`  | `var(--color-red-500)`    |

**Space**

| Token                               | Native default     |
| ----------------------------------- | ------------------ |
| `--s42-space-control-x`           | `var(--space-md)`  |
| `--s42-space-control-y`           | `var(--space-sm)`  |
| `--s42-space-field-x`             | `var(--space-sm)`  |
| `--s42-space-field-y`             | `var(--space-sm)`  |
| `--s42-space-item-x`              | `var(--space-sm)`  |
| `--s42-space-item-y`              | `var(--space-sm)`  |
| `--s42-space-container-x`         | `var(--space-md)`  |
| `--s42-space-container-y`         | `var(--space-md)`  |
| `--s42-space-container-compact-x` | `var(--space-sm)`  |
| `--s42-space-container-compact-y` | `var(--space-xs)`  |
| `--s42-space-overlay`             | `var(--space-sm)`  |
| `--s42-space-focus-offset`        | `var(--space-2xs)` |

**Space: gaps between elements (Stack, form fields, groups)**

| Token                   | Native default     |
| ----------------------- | ------------------ |
| `--s42-space-gap-2xs` | `var(--space-2xs)` |
| `--s42-space-gap-xs`  | `var(--space-xs)`  |
| `--s42-space-gap-sm`  | `var(--space-sm)`  |
| `--s42-space-gap-md`  | `var(--space-md)`  |
| `--s42-space-gap-lg`  | `var(--space-lg)`  |
| `--s42-space-gap-xl`  | `var(--space-xl)`  |
| `--s42-space-gap-2xl` | `var(--space-2xl)` |

**Size**

| Token                             | Native default      |
| --------------------------------- | ------------------- |
| `--s42-size-indicator`          | `var(--size-em-lg)` |
| `--s42-size-field-min-width`    | `var(--size-sm)`    |
| `--s42-size-overlay-max-width`  | `var(--size-md)`    |
| `--s42-size-overlay-max-height` | `var(--size-md)`    |

**Radius**

| Token                              | Native default     |
| ---------------------------------- | ------------------ |
| `--s42-radius-control`           | `var(--radius-md)` |
| `--s42-radius-field`             | `var(--radius-sm)` |
| `--s42-radius-item`              | `var(--radius-md)` |
| `--s42-radius-container`         | `var(--radius-md)` |
| `--s42-radius-container-compact` | `var(--radius-sm)` |
| `--s42-radius-overlay`           | `var(--radius-md)` |

**Border width**

| Token                                    | Native default               |
| ---------------------------------------- | ---------------------------- |
| `--s42-border-width-control`           | `var(--border-width-thin)`   |
| `--s42-border-width-field`             | `var(--border-width-thin)`   |
| `--s42-border-width-field-strong`      | `var(--border-width-medium)` |
| `--s42-border-width-container`         | `var(--border-width-thin)`   |
| `--s42-border-width-container-compact` | `var(--border-width-thin)`   |
| `--s42-border-width-overlay`           | `var(--border-width-none)`   |
| `--s42-border-width-focus`             | `var(--border-width-medium)` |

**Typography**

| Token                          | Native default               |
| ------------------------------ | ---------------------------- |
| `--s42-font-family-body`     | `var(--font-family-sans)`    |
| `--s42-font-size-control`    | `var(--font-size-md)`        |
| `--s42-font-size-body-sm`    | `var(--font-size-sm)`        |
| `--s42-font-weight-control`  | `var(--font-weight-regular)` |
| `--s42-font-weight-label`    | `var(--font-weight-bold)`    |
| `--s42-font-weight-emphasis` | `var(--font-weight-bold)`    |
| `--s42-line-height-body`     | `var(--line-height-normal)`  |

**Elevation**

| Token                      | Native default     |
| -------------------------- | ------------------ |
| `--s42-shadow-container` | `var(--shadow-sm)` |
| `--s42-shadow-overlay`   | `var(--shadow-sm)` |
| `--s42-shadow-raised`    | `var(--shadow-md)` |

**Motion**

| Token                      | Native default         |
| -------------------------- | ---------------------- |
| `--s42-duration-control` | `var(--duration-fast)` |
| `--s42-easing-control`   | `var(--easing-in-out)` |

## Primitive tokens

The native primitives in `primitive-tokens.css` are raw scales with no role: `--color-{palette}-{step}`, `--space-*`, `--size-*`, `--radius-*`, `--border-width-*`, `--font-*`, `--line-height-*`, `--shadow-*`, `--duration-*` and `--easing-*`.

Color palettes: `neutral` (achromatic, steps 0 = white to 1000 = black), `mauve` (slightly tinted neutral), and the hues `indigo`, `blue`, `purple`, `red`, `amber` and `green` (steps 50 to 950). Palette names describe appearance. Roles such as accent or danger are assigned only in the semantic mapping.

The palettes are generated by `scripts/generate-primitive-colors.mjs`: each palette is a hue and a peak chroma in OKLCH, every step has a fixed lightness, and chroma follows a fixed curve that peaks at mid lightness. Run `pnpm --filter @sys42/ui tokens:colors` after changing a palette, and `tokens:check` to verify the file is up to date.

## Compatibility policy

The public token API is the semantic tokens, the family tokens and the native primitives.

| Change                               | Release                               |
| ------------------------------------ | ------------------------------------- |
| Remove or rename a public token      | Major                                 |
| Add a required semantic token        | Major (custom mappings need updating) |
| Change the meaning of a public token | Assessed per change, usually major    |
| Add an optional family token         | Minor                                 |

There is no mandatory deprecation period and no compatibility aliases. From 4.0.0 on, every rename and removal is recorded in `token-migrations.json` and reported by `sys42-check-tokens`. Moving from the 3.x custom properties is a switch to a new system, not a list of renames: see [TOKENS-MIGRATION.md](./TOKENS-MIGRATION.md).
