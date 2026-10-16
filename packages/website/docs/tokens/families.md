---
sidebar_position: 4
---

# Families

Every component belongs to exactly one family and reads only that family's tokens. Each token falls back to the listed semantic token. A fallback of `transparent` or `inherit` means "no decoration" by default.

## Button

Members: `Button`, `ButtonA`, `SplitButton`, `MenuButton`, `OverflowMenu` (trigger). Variants: default, `accent`, `highlight`, `danger`.

| Token | Fallback | Value | Scope | Used by |
| --- | --- | --- | --- | --- |
| `--button-background` | `--s42-color-control` | color | default variant | all |
| `--button-color` | `--s42-color-onControl` | color | default variant | all |
| `--button-borderColor` | `transparent` | color | default variant | Button, SplitButton, MenuButton |
| `--button-accent-background` | `--s42-color-controlAccent` | color | accent | Button, SplitButton, MenuButton |
| `--button-accent-color` | `--s42-color-onControlAccent` | color | accent | Button, SplitButton, MenuButton |
| `--button-accent-borderColor` | `transparent` | color | accent | Button, SplitButton, MenuButton |
| `--button-highlight-background` | `--s42-color-controlHighlight` | color | highlight | Button, SplitButton, MenuButton |
| `--button-highlight-color` | `--s42-color-onControlHighlight` | color | highlight | Button, SplitButton, MenuButton |
| `--button-highlight-borderColor` | `transparent` | color | highlight | Button, SplitButton, MenuButton |
| `--button-danger-background` | `--s42-color-controlDanger` | color | danger | Button, SplitButton, MenuButton |
| `--button-danger-color` | `--s42-color-onControlDanger` | color | danger | Button, SplitButton, MenuButton |
| `--button-danger-borderColor` | `transparent` | color | danger | Button, SplitButton, MenuButton |
| `--button-borderWidth` | `--s42-borderWidth-control` | length | all variants | Button, SplitButton, MenuButton |
| `--button-radius` | `--s42-radius-control` | length | all variants | Button, SplitButton, MenuButton |
| `--button-paddingX` | `--s42-space-controlX` | length | all variants (lg × 1.5) | Button, SplitButton, MenuButton |
| `--button-paddingY` | `--s42-space-controlY` | length | all variants (lg × 1.5) | all (OverflowMenu: padding on all sides) |
| `--button-fontSize` | `--s42-fontSize-control` | length | all variants | Button, SplitButton, MenuButton |
| `--button-fontWeight` | `--s42-fontWeight-control` | font-weight | all variants | Button, SplitButton, MenuButton |
| `--button-lineHeight` | `inherit` | line-height | all variants | all |
| `--button-divider` | `--s42-borderWidth-control solid --s42-color-controlDivider` | border shorthand | all variants | SplitButton |

The popup menus of SplitButton, MenuButton and OverflowMenu use `--s42-color-surfaceBright` and `--s42-color-onSurface`, and the overlay tokens `--s42-shadow-overlay`, `--s42-radius-overlay`, `--s42-space-overlay` and `--s42-size-overlayMax*`.

## Input

Members: `TextInput`, `TextArea`, `Select`, `Listbox`.

| Token | Fallback | Value | Used by |
| --- | --- | --- | --- |
| `--input-background` | `--s42-color-surfaceBright` | color | all |
| `--input-color` | `--s42-color-onSurface` | color | all |
| `--input-borderColor` | `--s42-color-outline` | color | all |
| `--input-borderWidth` | `--s42-borderWidth-field` | length | all |
| `--input-radius` | `--s42-radius-field` | length | all |
| `--input-paddingX` | `--s42-space-fieldX` | length | all |
| `--input-paddingY` | `--s42-space-fieldY` | length | all |
| `--input-lineHeight` | `inherit` | line-height | all |
| `--input-placeholder-color` | `--s42-color-onSurface-subtle` | color | Listbox |
| `--input-minWidth` | `--s42-size-fieldMinWidth` | length | Listbox |

Disabled Select and Listbox use `--s42-color-controlDisabled` and `--s42-color-onControlDisabled`.

## Menu item

Members: `OverflowMenuItem`, `SplitButtonItem`, `MenuButtonItem`, `ListboxItem`.

| Token | Fallback | Value | Used by |
| --- | --- | --- | --- |
| `--menuItem-paddingX` | `--s42-space-itemX` | length | all |
| `--menuItem-paddingY` | `--s42-space-itemY` | length | all |
| `--menuItem-radius` | `--s42-radius-item` | length | all |
| `--menuItem-selected-fontWeight` | `--s42-fontWeight-emphasis` | font-weight | ListboxItem |

The highlight is derived from the item color and `--s42-color-surfaceBright`. Disabled items use `--s42-color-onSurface-subtle`.

## Checkbox

Members: `Checkbox`.

| Token | Fallback | Value |
| --- | --- | --- |
| `--checkbox-background` | `--s42-color-surfaceBright` | color |
| `--checkbox-borderColor` | `--s42-color-outline` | color |
| `--checkbox-borderWidth` | `--s42-borderWidth-field-strong` | length |
| `--checkbox-radius` | `--s42-radius-field` | length |

The size is `--s42-size-indicator`. Checked uses `--s42-color-controlAccent` / `--s42-color-onControlAccent`, disabled uses `--s42-color-controlDisabled` / `--s42-color-onControlDisabled`.

## Radio

Members: `Radio`.

| Token | Fallback | Value |
| --- | --- | --- |
| `--radio-background` | `--s42-color-surfaceBright` | color |
| `--radio-borderColor` | `--s42-color-outline` | color |
| `--radio-borderWidth` | `--s42-borderWidth-field-strong` | length |

Size, checked and disabled colors work like Checkbox.

## Message

Members: `Message`. Variants: default, `success`, `warning`, `danger`.

| Token | Fallback | Value | Scope |
| --- | --- | --- | --- |
| `--message-background` | `--s42-color-container` | color | default variant |
| `--message-color` | `--s42-color-onContainer` | color | default variant |
| `--message-borderColor` | `transparent` | color | default variant |
| `--message-success-background` | `--s42-color-containerSuccess` | color | success |
| `--message-success-color` | `--s42-color-onContainerSuccess` | color | success |
| `--message-success-borderColor` | `transparent` | color | success |
| `--message-warning-background` | `--s42-color-containerWarning` | color | warning |
| `--message-warning-color` | `--s42-color-onContainerWarning` | color | warning |
| `--message-warning-borderColor` | `transparent` | color | warning |
| `--message-danger-background` | `--s42-color-containerDanger` | color | danger |
| `--message-danger-color` | `--s42-color-onContainerDanger` | color | danger |
| `--message-danger-borderColor` | `transparent` | color | danger |
| `--message-borderWidth` | `--s42-borderWidth-container-compact` | length | all variants |
| `--message-radius` | `--s42-radius-container-compact` | length | all variants |
| `--message-fontSize` | `--s42-fontSize-body-sm` | length | all variants |

## Card

Members: `classCard` (helper class).

| Token | Fallback | Value |
| --- | --- | --- |
| `--card-background` | `--s42-color-surfaceBright` | color |
| `--card-color` | `--s42-color-onSurface` | color |
| `--card-borderColor` | `--s42-color-outline-subtle` | color |
| `--card-borderWidth` | `--s42-borderWidth-container` | length |
| `--card-radius` | `--s42-radius-container` | length |
| `--card-boxShadow` | `--s42-shadow-container` | box-shadow |
| `--card-paddingX` | `--s42-space-containerX` | length |
| `--card-paddingY` | `--s42-space-containerY` | length |

## Stack

Members: `Stack`.

| Token | Fallback | Value |
| --- | --- | --- |
| `--stack-spacing` | `--s42-space-gap-md` | length |

The `spacing` prop takes precedence over `--stack-spacing`.

## Families without public tokens

These families are styled through semantic tokens only: `Label`, `FormField`, `FormFieldSet`, `LabeledControl`, `CheckboxGroup` (with `CheckboxGroupItem`), `RadioGroup` (with `RadioGroupItem`), `TextLink` (with `TextLinkButton`), `classButtonGroup`. `Option` has no styles.
