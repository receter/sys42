---
sidebar_position: 8
---

# Migrating to the token system (4.0.0)

4.0.0 replaces the custom properties of 3.x with a new design token system. There is no one-to-one mapping from the old properties: none of the 3.x `--sys42-*` custom properties exist anymore. Rebuild your customizations on the new system using [Design tokens](./overview.md).

## What changed

- Tokens are organized in three layers: native primitives (`--color-primary-40`, `--space-md`), semantic tokens (`--s42-color-control`) and optional family tokens (`--button-background`).
- The prefix changed from `--sys42-` to `--s42-`, and only semantic tokens use it. Settings that configured a single component are now family tokens, which are unset by default and fall back to semantic tokens inside each component.
- Hover, active, checked and disabled colors are no longer configurable per component. They are derived from the resolved colors or come from semantic tokens.
- The native colors are new Material 3 tonal palettes (`primary`, `secondary`, `tertiary`, `danger`, `warning`, `success`, `neutral`), so the default theme looks different. Layout, spacing and typography are unchanged.
- The Button, SplitButton and MenuButton variant `primary` is now `accent`, and there is a new `highlight` variant.
- The Message variant `info` was removed, and `error` is now `danger`.

## How to migrate

1. Keep importing `@sys42/ui/base.css` and `@sys42/ui/default-custom-properties.css`. The import paths are unchanged and still give you the native theme.
2. Remove your overrides of 3.x custom properties. To find them, run:

   ```bash
   npx sys42-check-tokens --overrides src/**/*.css
   ```

   Every 3.x property is reported as unknown.

3. Decide what each override was for and recreate it with the new tokens:

   - **System-wide decisions** (brand colors, radii, spacing): override semantic tokens.
   - **Changes to one group of components** (e.g. all buttons): set family tokens.

   The [semantic token reference](./semantic-tokens.mdx) lists all semantic tokens and [Families](./families.md) every family's tokens.

4. If your project uses its own primitives, provide a complete semantic mapping instead of loading the native token files, and check it with `npx sys42-check-tokens <your-mapping>.css`. See [Your own primitives](./setup.md#your-own-primitives).
