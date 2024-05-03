# Stack

The stack component is used if multiple components need vertical space between them.

Per default, the stack component will add `--sys42-stack-spacing` margin-top to every `.stack > * + *`. `--sys42-stack-spacing` is set to `--sys42-spacing-md` by default.

Stack spacing can be adjusted by setting `--sys42-stack-spacing` on the stack component. For example:
`<Stack style={{ "--sys42-stack-spacing": "2em" }}>`

You can also set the `spacing` prop to adjust the stack spacing. For example:
`<Stack spacing="2em">` or `<Stack spacing="md">`
