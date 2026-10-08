# Helper classes

https://github.com/receter/sys42/discussions/3

## inlineIcon

`classInlineIcon` can be used to display an icon inline with text. The class positions the icon in the center of the line-height. Further it sets a max height of line-height to ensure the icon does not exceed the line height of the text.

Known issue: This class does not properly center the icon if the font metrics `ascender − cap-height` does not match `descender`.

## card

`classCard` can be used on html elements to give them a card-like appearance.

### Tokens

`classCard` is the Card family. It reads `--card-background`, `--card-color`, `--card-border-color`, `--card-border-width`, `--card-radius`, `--card-box-shadow`, `--card-padding-x` and `--card-padding-y`, each with a semantic fallback. See [TOKENS.md](../../TOKENS.md#card).
