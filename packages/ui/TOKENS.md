# Design Tokens and Theming

System 42 styles are configured with CSS custom properties, organized in three token layers. Theming is CSS only: there is no ThemeProvider and no theming prop.

| Layer     | Purpose                                        | Examples                                          | Availability                                         |
| --------- | ---------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Primitive | Raw values and scales                          | `--color-primary-90`, `--space-md`, `--radius-sm` | Only if your project loads them (native or your own) |
| Semantic  | System-wide design decisions                   | `--s42-color-control`, `--s42-radius-control`     | Guaranteed by every valid sys42 integration          |
| Family    | Optional configuration of one component family | `--button-background`, `--input-radius`           | Unset unless you set them                            |

Components also use private `--_*` variables (e.g. `--_color`) internally. They are not an API: don't set or read them.

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

| Layer     | Examples                                                                                                 |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Semantic  | `--s42-space-controlX`, `--s42-color-onSurface-muted`, `--s42-borderWidth-field-strong`                  |
| Family    | `--button-color`, `--button-accent-color`, `--input-placeholder-color`, `--menuItem-selected-fontWeight` |
| Primitive | `--color-primary-40`, `--space-md`, `--fontSize-sm`, `--easing-inOut`                                    |

The private `--_*` variables inside components don't follow this scheme (`--_padding-x`); they are not an API. The build fails if a token name in the library has more than three segments or a segment that isn't camelCase.

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
  background: var(--s42-color-surface);
  color: var(--s42-color-onSurface);
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
  --s42-color-controlAccent: #0b6e4f;
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

  --s42-space-controlX: var(--acme-spacing-300);
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
  --s42-color-onControl: #111111;
}

.sidebar {
  --s42-color-control: #333333;
  --s42-color-onControl: #ffffff;
}
```

Default buttons inside `.sidebar` use the sidebar colors, buttons outside use the root colors.

Override the semantic tokens themselves at the scope where you need them. Changing a primitive in a descendant (e.g. `.sidebar { --color-primary-90: … }`) does **not** update semantic tokens that already resolved on `:root`. The same applies to your own aliases: a family token set to `var(--acme-brand)` resolves where you declare it.

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

Color tokens are variant specific. `--button-background` only applies to the default variant and is not a fallback for `--button-accent-background`, which falls back to `--s42-color-controlAccent` directly. Size and shape tokens such as `--button-radius` and `--button-paddingX` are shared by all variants. The `lg` size uses the padding × 1.5.

Hover, active, highlighted, checked and disabled colors are derived internally from the resolved colors (e.g. hover mixes 8% of the text color into the background) or come from semantic tokens. There are no public state-color tokens.

## Families

Every component belongs to exactly one family and reads only that family's tokens. Each token falls back to the listed semantic token. A fallback of `transparent` or `inherit` means "no decoration" by default.

### Button

Members: `Button`, `ButtonA`, `SplitButton`, `MenuButton`, `OverflowMenu` (trigger). Variants: default, `accent`, `highlight`, `danger`.

| Token                            | Fallback                                                     | Value            | Scope                   | Used by                                  |
| -------------------------------- | ------------------------------------------------------------ | ---------------- | ----------------------- | ---------------------------------------- |
| `--button-background`            | `--s42-color-control`                                        | color            | default variant         | all                                      |
| `--button-color`                 | `--s42-color-onControl`                                      | color            | default variant         | all                                      |
| `--button-borderColor`           | `transparent`                                                | color            | default variant         | Button, SplitButton, MenuButton          |
| `--button-accent-background`     | `--s42-color-controlAccent`                                  | color            | accent                  | Button, SplitButton, MenuButton          |
| `--button-accent-color`          | `--s42-color-onControlAccent`                                | color            | accent                  | Button, SplitButton, MenuButton          |
| `--button-accent-borderColor`    | `transparent`                                                | color            | accent                  | Button, SplitButton, MenuButton          |
| `--button-highlight-background`  | `--s42-color-controlHighlight`                               | color            | highlight               | Button, SplitButton, MenuButton          |
| `--button-highlight-color`       | `--s42-color-onControlHighlight`                             | color            | highlight               | Button, SplitButton, MenuButton          |
| `--button-highlight-borderColor` | `transparent`                                                | color            | highlight               | Button, SplitButton, MenuButton          |
| `--button-danger-background`     | `--s42-color-controlDanger`                                  | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-danger-color`          | `--s42-color-onControlDanger`                                | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-danger-borderColor`    | `transparent`                                                | color            | danger                  | Button, SplitButton, MenuButton          |
| `--button-borderWidth`           | `--s42-borderWidth-control`                                  | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-radius`                | `--s42-radius-control`                                       | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-paddingX`              | `--s42-space-controlX`                                       | length           | all variants (lg × 1.5) | Button, SplitButton, MenuButton          |
| `--button-paddingY`              | `--s42-space-controlY`                                       | length           | all variants (lg × 1.5) | all (OverflowMenu: padding on all sides) |
| `--button-fontSize`              | `--s42-fontSize-control`                                     | length           | all variants            | Button, SplitButton, MenuButton          |
| `--button-fontWeight`            | `--s42-fontWeight-control`                                   | font-weight      | all variants            | Button, SplitButton, MenuButton          |
| `--button-lineHeight`            | `inherit`                                                    | line-height      | all variants            | all                                      |
| `--button-divider`               | `--s42-borderWidth-control solid --s42-color-controlDivider` | border shorthand | all variants            | SplitButton                              |

The popup menus of SplitButton, MenuButton and OverflowMenu use `--s42-color-surfaceBright` and `--s42-color-onSurface`, and the overlay tokens `--s42-shadow-overlay`, `--s42-radius-overlay`, `--s42-space-overlay` and `--s42-size-overlayMax*`.

### Input

Members: `TextInput`, `TextArea`, `Select`, `Listbox`.

| Token                       | Fallback                       | Value       | Used by |
| --------------------------- | ------------------------------ | ----------- | ------- |
| `--input-background`        | `--s42-color-surfaceBright`    | color       | all     |
| `--input-color`             | `--s42-color-onSurface`        | color       | all     |
| `--input-borderColor`       | `--s42-color-outline`          | color       | all     |
| `--input-borderWidth`       | `--s42-borderWidth-field`      | length      | all     |
| `--input-radius`            | `--s42-radius-field`           | length      | all     |
| `--input-paddingX`          | `--s42-space-fieldX`           | length      | all     |
| `--input-paddingY`          | `--s42-space-fieldY`           | length      | all     |
| `--input-lineHeight`        | `inherit`                      | line-height | all     |
| `--input-placeholder-color` | `--s42-color-onSurface-subtle` | color       | Listbox |
| `--input-minWidth`          | `--s42-size-fieldMinWidth`     | length      | Listbox |

Disabled Select and Listbox use `--s42-color-controlDisabled` and `--s42-color-onControlDisabled`.

### Menu item

Members: `OverflowMenuItem`, `SplitButtonItem`, `MenuButtonItem`, `ListboxItem`.

| Token                            | Fallback                    | Value       | Used by     |
| -------------------------------- | --------------------------- | ----------- | ----------- |
| `--menuItem-paddingX`            | `--s42-space-itemX`         | length      | all         |
| `--menuItem-paddingY`            | `--s42-space-itemY`         | length      | all         |
| `--menuItem-radius`              | `--s42-radius-item`         | length      | all         |
| `--menuItem-selected-fontWeight` | `--s42-fontWeight-emphasis` | font-weight | ListboxItem |

The highlight is derived from the item color and `--s42-color-surfaceBright`. Disabled items use `--s42-color-onSurface-subtle`.

### Checkbox

Members: `Checkbox`.

| Token                    | Fallback                         | Value  |
| ------------------------ | -------------------------------- | ------ |
| `--checkbox-background`  | `--s42-color-surfaceBright`      | color  |
| `--checkbox-borderColor` | `--s42-color-outline`            | color  |
| `--checkbox-borderWidth` | `--s42-borderWidth-field-strong` | length |
| `--checkbox-radius`      | `--s42-radius-field`             | length |

The size is `--s42-size-indicator`. Checked uses `--s42-color-controlAccent` / `--s42-color-onControlAccent`, disabled uses `--s42-color-controlDisabled` / `--s42-color-onControlDisabled`.

### Radio

Members: `Radio`.

| Token                 | Fallback                         | Value  |
| --------------------- | -------------------------------- | ------ |
| `--radio-background`  | `--s42-color-surfaceBright`      | color  |
| `--radio-borderColor` | `--s42-color-outline`            | color  |
| `--radio-borderWidth` | `--s42-borderWidth-field-strong` | length |

Size, checked and disabled colors work like Checkbox.

### Message

Members: `Message`. Variants: default, `success`, `warning`, `danger`.

| Token                           | Fallback                              | Value  | Scope           |
| ------------------------------- | ------------------------------------- | ------ | --------------- |
| `--message-background`          | `--s42-color-container`               | color  | default variant |
| `--message-color`               | `--s42-color-onContainer`             | color  | default variant |
| `--message-borderColor`         | `transparent`                         | color  | default variant |
| `--message-success-background`  | `--s42-color-containerSuccess`        | color  | success         |
| `--message-success-color`       | `--s42-color-onContainerSuccess`      | color  | success         |
| `--message-success-borderColor` | `transparent`                         | color  | success         |
| `--message-warning-background`  | `--s42-color-containerWarning`        | color  | warning         |
| `--message-warning-color`       | `--s42-color-onContainerWarning`      | color  | warning         |
| `--message-warning-borderColor` | `transparent`                         | color  | warning         |
| `--message-danger-background`   | `--s42-color-containerDanger`         | color  | danger          |
| `--message-danger-color`        | `--s42-color-onContainerDanger`       | color  | danger          |
| `--message-danger-borderColor`  | `transparent`                         | color  | danger          |
| `--message-borderWidth`         | `--s42-borderWidth-container-compact` | length | all variants    |
| `--message-radius`              | `--s42-radius-container-compact`      | length | all variants    |
| `--message-fontSize`            | `--s42-fontSize-body-sm`              | length | all variants    |

### Card

Members: `classCard` (helper class).

| Token                | Fallback                      | Value      |
| -------------------- | ----------------------------- | ---------- |
| `--card-background`  | `--s42-color-surfaceBright`   | color      |
| `--card-color`       | `--s42-color-onSurface`       | color      |
| `--card-borderColor` | `--s42-color-outline-subtle`  | color      |
| `--card-borderWidth` | `--s42-borderWidth-container` | length     |
| `--card-radius`      | `--s42-radius-container`      | length     |
| `--card-boxShadow`   | `--s42-shadow-container`      | box-shadow |
| `--card-paddingX`    | `--s42-space-containerX`      | length     |
| `--card-paddingY`    | `--s42-space-containerY`      | length     |

### Stack

Members: `Stack`.

| Token             | Fallback             | Value  |
| ----------------- | -------------------- | ------ |
| `--stack-spacing` | `--s42-space-gap-md` | length |

The `spacing` prop takes precedence over `--stack-spacing`.

### Families without public tokens

These families are styled through semantic tokens only: `Label`, `FormField`, `FormFieldSet`, `LabeledControl`, `CheckboxGroup` (with `CheckboxGroupItem`), `RadioGroup` (with `RadioGroupItem`), `TextLink` (with `TextLinkButton`), `classButtonGroup`. `Option` has no styles.

## Semantic tokens

Every valid integration defines all of these. The native default is the mapping in `semantic-tokens.css`. The machine-readable inventory is `@sys42/ui/semantic-tokens.json`.

Semantic tokens follow the [naming scheme](#naming): `--s42-{category}-{name}-{modifier}`. Color names follow these rules:

- **Pairs:** `on<Role>` is the text and icon color for the background `<role>`: `--s42-color-controlAccent` / `--s42-color-onControlAccent`. An `on<Role>` token always has a matching background token. The build fails otherwise.
- **Modifiers:** a modifier after a hyphen means the same usage in another variant: `onSurface-muted`, `onSurface-subtle` and `onSurface-danger` are all text colors for surfaces. A modifier never names a new background, so `onSurface-danger` is danger text on `surface`, not the foreground of a danger surface. New backgrounds get their own camelCase role (`containerDanger` / `onContainerDanger`).
- **Containers:** `<role>Container` holds a control of that role, such as a toggle track or a slider bar: `controlAccentContainer`. Control containers work on `surface` and `surfaceBright`.
- **Surfaces:** every `onSurface*` color works on both `surface` and `surfaceBright`.

Color roles:

- `surface`, `surfaceBright`: page and raised backgrounds (fields, cards, menus).
- `control*`: the control itself (a button, a toggle handle, a slider handle). `control` is the default, `controlAccent` has more contrast, `controlHighlight` is more vibrant, `controlDanger` is for errors and destructive actions, `controlDisabled` for disabled controls.
- `container*`: containers such as messages. `container` is the default, plus `containerSuccess`, `containerWarning` and `containerDanger`. The same three tones are used everywhere: `danger` (errors and destructive actions), `warning` and `success`, from the primitive palettes of the same names.
- `outline`, `outline-subtle`: field borders and decorative borders (cards). `focus`, `link`: focus ring and links.

**Color: surfaces. All onSurface\* colors work on surface and surfaceBright.**

| Token                          | Native default              |
| ------------------------------ | --------------------------- |
| `--s42-color-surface`          | `var(--color-tertiary-95)`  |
| `--s42-color-surfaceBright`    | `var(--color-tertiary-100)` |
| `--s42-color-onSurface`        | `var(--color-primary-10)`   |
| `--s42-color-onSurface-muted`  | `var(--color-primary-30)`   |
| `--s42-color-onSurface-subtle` | `var(--color-primary-50)`   |
| `--s42-color-onSurface-danger` | `var(--color-danger-40)`    |

**Color: outlines on surfaces (field borders, card borders)**

| Token                        | Native default            |
| ---------------------------- | ------------------------- |
| `--s42-color-outline`        | `var(--color-neutral-50)` |
| `--s42-color-outline-subtle` | `var(--color-neutral-80)` |

**Color: controls. control* is the control itself (a button, a toggle handle),
control*Container holds a control (a toggle track, a slider bar) and works
on surface and surfaceBright.**

| Token                                   | Native default                                                 |
| --------------------------------------- | -------------------------------------------------------------- |
| `--s42-color-control`                   | `var(--color-primary-80)`                                      |
| `--s42-color-onControl`                 | `var(--color-primary-10)`                                      |
| `--s42-color-controlContainer`          | `var(--color-primary-60)`                                      |
| `--s42-color-controlAccent`             | `var(--color-primary-10)`                                      |
| `--s42-color-onControlAccent`           | `var(--color-primary-100)`                                     |
| `--s42-color-controlAccentContainer`    | `var(--color-primary-90)`                                      |
| `--s42-color-controlHighlight`          | `var(--color-secondary-80)`                                    |
| `--s42-color-onControlHighlight`        | `var(--color-primary-10)`                                      |
| `--s42-color-controlHighlightContainer` | `var(--color-secondary-90)`                                    |
| `--s42-color-controlDanger`             | `var(--color-danger-40)`                                       |
| `--s42-color-onControlDanger`           | `var(--color-danger-100)`                                      |
| `--s42-color-controlDangerContainer`    | `var(--color-danger-90)`                                       |
| `--s42-color-controlDisabled`           | `color-mix(in srgb, var(--color-primary-10) 12%, transparent)` |
| `--s42-color-onControlDisabled`         | `color-mix(in srgb, var(--color-primary-10) 38%, transparent)` |
| `--s42-color-controlDisabledContainer`  | `color-mix(in srgb, var(--color-primary-10) 8%, transparent)`  |

**Color: divider between the two parts of a split control, works on all control colors**

| Token                        | Native default                                                |
| ---------------------------- | ------------------------------------------------------------- |
| `--s42-color-controlDivider` | `color-mix(in srgb, var(--color-primary-0) 15%, transparent)` |

**Color: containers (Message variants)**

| Token                            | Native default            |
| -------------------------------- | ------------------------- |
| `--s42-color-container`          | `var(--color-primary-90)` |
| `--s42-color-onContainer`        | `var(--color-primary-10)` |
| `--s42-color-containerSuccess`   | `var(--color-success-95)` |
| `--s42-color-onContainerSuccess` | `var(--color-success-30)` |
| `--s42-color-containerWarning`   | `var(--color-warning-90)` |
| `--s42-color-onContainerWarning` | `var(--color-warning-10)` |
| `--s42-color-containerDanger`    | `var(--color-danger-90)`  |
| `--s42-color-onContainerDanger`  | `var(--color-danger-10)`  |

**Color: focus ring and links**

| Token                      | Native default            |
| -------------------------- | ------------------------- |
| `--s42-color-focus`        | `var(--color-primary-40)` |
| `--s42-color-link`         | `var(--color-primary-40)` |
| `--s42-color-link-visited` | `var(--color-primary-30)` |
| `--s42-color-link-active`  | `var(--color-danger-40)`  |

**Space**

| Token                            | Native default     |
| -------------------------------- | ------------------ |
| `--s42-space-controlX`           | `var(--space-md)`  |
| `--s42-space-controlY`           | `var(--space-sm)`  |
| `--s42-space-fieldX`             | `var(--space-sm)`  |
| `--s42-space-fieldY`             | `var(--space-sm)`  |
| `--s42-space-itemX`              | `var(--space-sm)`  |
| `--s42-space-itemY`              | `var(--space-sm)`  |
| `--s42-space-containerX`         | `var(--space-md)`  |
| `--s42-space-containerY`         | `var(--space-md)`  |
| `--s42-space-containerX-compact` | `var(--space-sm)`  |
| `--s42-space-containerY-compact` | `var(--space-xs)`  |
| `--s42-space-overlay`            | `var(--space-sm)`  |
| `--s42-space-focusOffset`        | `var(--space-2xs)` |

**Space: gaps between elements (Stack, form fields, groups)**

| Token                 | Native default     |
| --------------------- | ------------------ |
| `--s42-space-gap-2xs` | `var(--space-2xs)` |
| `--s42-space-gap-xs`  | `var(--space-xs)`  |
| `--s42-space-gap-sm`  | `var(--space-sm)`  |
| `--s42-space-gap-md`  | `var(--space-md)`  |
| `--s42-space-gap-lg`  | `var(--space-lg)`  |
| `--s42-space-gap-xl`  | `var(--space-xl)`  |
| `--s42-space-gap-2xl` | `var(--space-2xl)` |

**Size**

| Token                         | Native default      |
| ----------------------------- | ------------------- |
| `--s42-size-indicator`        | `var(--size-em-lg)` |
| `--s42-size-fieldMinWidth`    | `var(--size-sm)`    |
| `--s42-size-overlayMaxWidth`  | `var(--size-md)`    |
| `--s42-size-overlayMaxHeight` | `var(--size-md)`    |

**Radius**

| Token                            | Native default     |
| -------------------------------- | ------------------ |
| `--s42-radius-control`           | `var(--radius-md)` |
| `--s42-radius-field`             | `var(--radius-sm)` |
| `--s42-radius-item`              | `var(--radius-md)` |
| `--s42-radius-container`         | `var(--radius-md)` |
| `--s42-radius-container-compact` | `var(--radius-sm)` |
| `--s42-radius-overlay`           | `var(--radius-md)` |

**Border width**

| Token                                 | Native default              |
| ------------------------------------- | --------------------------- |
| `--s42-borderWidth-control`           | `var(--borderWidth-thin)`   |
| `--s42-borderWidth-field`             | `var(--borderWidth-thin)`   |
| `--s42-borderWidth-field-strong`      | `var(--borderWidth-medium)` |
| `--s42-borderWidth-container`         | `var(--borderWidth-thin)`   |
| `--s42-borderWidth-container-compact` | `var(--borderWidth-thin)`   |
| `--s42-borderWidth-overlay`           | `var(--borderWidth-none)`   |
| `--s42-borderWidth-focus`             | `var(--borderWidth-medium)` |

**Typography**

| Token                       | Native default              |
| --------------------------- | --------------------------- |
| `--s42-fontFamily-body`     | `var(--fontFamily-sans)`    |
| `--s42-fontSize-control`    | `var(--fontSize-md)`        |
| `--s42-fontSize-body-sm`    | `var(--fontSize-sm)`        |
| `--s42-fontWeight-control`  | `var(--fontWeight-regular)` |
| `--s42-fontWeight-label`    | `var(--fontWeight-bold)`    |
| `--s42-fontWeight-emphasis` | `var(--fontWeight-bold)`    |
| `--s42-lineHeight-body`     | `var(--lineHeight-normal)`  |

**Elevation**

| Token                    | Native default     |
| ------------------------ | ------------------ |
| `--s42-shadow-container` | `var(--shadow-sm)` |
| `--s42-shadow-overlay`   | `var(--shadow-sm)` |
| `--s42-shadow-raised`    | `var(--shadow-md)` |

**Motion**

| Token                    | Native default         |
| ------------------------ | ---------------------- |
| `--s42-duration-control` | `var(--duration-fast)` |
| `--s42-easing-control`   | `var(--easing-inOut)`  |

## Primitive tokens

The native primitives in `primitive-tokens.css` are raw scales: `--color-{palette}-{tone}`, `--space-*`, `--size-*`, `--radius-*`, `--borderWidth-*`, `--fontFamily-*`, `--fontSize-*`, `--fontWeight-*`, `--lineHeight-*`, `--shadow-*`, `--duration-*` and `--easing-*`.

The color palettes are Material 3 tonal palettes named by role: `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success` and `neutral`. Each has the tones 0 (black), 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99 and 100 (white). In the native mapping, `primary` is used for text on surfaces, controls and the accent, `secondary` for highlight, `tertiary` for the surfaces, and `danger`, `warning` and `success` for the status tones.

The palettes are generated by `scripts/generate-primitive-colors.mjs` with `@material/material-color-utilities`: each palette is defined by a seed color (or directly by a hue and a chroma), whose hue and chroma in HCT, the color space of Material 3, define all tones. The output matches the Material Theme Builder for the same colors. Run `pnpm --filter @sys42/ui tokens:colors` after changing a palette, and `tokens:check` to verify the file is up to date.

## Compatibility policy

The public token API is the semantic tokens, the family tokens and the native primitives.

| Change                               | Release                               |
| ------------------------------------ | ------------------------------------- |
| Remove or rename a public token      | Major                                 |
| Add a required semantic token        | Major (custom mappings need updating) |
| Change the meaning of a public token | Assessed per change, usually major    |
| Add an optional family token         | Minor                                 |

There is no mandatory deprecation period and no compatibility aliases. From 4.0.0 on, every rename and removal is recorded in `token-migrations.json` and reported by `sys42-check-tokens`. Moving from the 3.x custom properties is a switch to a new system, not a list of renames: see [TOKENS-MIGRATION.md](./TOKENS-MIGRATION.md).
