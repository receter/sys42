---
sidebar_position: 7
---

# Compatibility policy

The public token API is the semantic tokens, the family tokens and the native primitives.

| Change | Release |
| --- | --- |
| Remove or rename a public token | Major |
| Add a required semantic token | Major (custom mappings need updating) |
| Change the meaning of a public token | Assessed per change, usually major |
| Add an optional family token | Minor |

There is no mandatory deprecation period and no compatibility aliases. From 4.0.0 on, every rename and removal is recorded in `token-migrations.json` in the `@sys42/ui` package and reported by [`sys42-check-tokens`](./setup.md#checking-your-mapping). Each entry records the version, the renamed tokens (`from`, `to`) and the removed tokens with migration guidance.

Moving from the 3.x custom properties is a switch to a new system, not a list of renames: see [Migrating to the token system](./migration-4.md).
