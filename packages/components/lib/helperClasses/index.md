# Helper classes

https://github.com/receter/sys42/discussions/3

## inlineIcon

`classInlineIcon` can be used to display an icon inline with text. The class positions the icon in the center of the line-height. Further it sets a max height of line-height to ensure the icon does not exceed the line height of the text.

Known issue: This class does not properly center the icon if the font metrics `ascender − cap-height` does not match `descender`.

## card

`classCard` can be used on html elements to give them a card-like appearance.

### Custom properties

- `--sys42-card-padding-vert`
- `--sys42-card-padding-horiz`
- `--sys42-card-background`
- `--sys42-card-border-radius`
- `--sys42-card-border`
- `--sys42-card-shadow`
