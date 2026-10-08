# Stack

The stack component is used if multiple components need vertical space between them.

Per default, the stack component adds a margin-top to every `.stack > * + *`. The spacing is `--stack-spacing` if set, otherwise `--sys42-space-gap-md`.

Stack spacing can be adjusted by setting the family token `--stack-spacing` on the stack or any ancestor. For example:
`<Stack style={{ "--stack-spacing": "2em" }}>`

You can also set the `spacing` prop to adjust the stack spacing. For example:
`<Stack spacing="2em">` or `<Stack spacing="md">`. Abbreviations (`xxs` to `xxl`) map to `--sys42-space-gap-2xs` … `--sys42-space-gap-2xl`. The prop takes precedence over `--stack-spacing`.
