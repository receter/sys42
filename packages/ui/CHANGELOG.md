# Changelog

## [1.2.1](https://github.com/receter/sys42/compare/ui-v1.2.0...ui-v1.2.1) (2024-10-08)


### Bug Fixes

* button padding vert/horiz swapped ([5790b82](https://github.com/receter/sys42/commit/5790b822d0bcf2ce6872f646a5626f70ac551e62))
* export FormFieldContext ([c1c1a85](https://github.com/receter/sys42/commit/c1c1a85c19249f381d154df743cf9957cbe51799))

## [1.2.0](https://github.com/receter/sys42/compare/ui-v1.1.0...ui-v1.2.0) (2024-10-07)


### Features

* improved css variables for button ([9ee341f](https://github.com/receter/sys42/commit/9ee341f438ae2afad9ba3697a6b7f53db99e2f9d))
* set content elements margin to 0 and add a content class for formating content nicely ([e8dc94a](https://github.com/receter/sys42/commit/e8dc94a9f2a9224ce9336698b38f3b9a16565501))
* Switch to border width and color vars instead of border shorthand ([1c2f411](https://github.com/receter/sys42/commit/1c2f411c87fc0242e0d70ca826e78521a3ff7cd5))


### Bug Fixes

* better CSS custom property name for focus styles ([9045ec3](https://github.com/receter/sys42/commit/9045ec35262fd6c73281ea576710d570b11f7079))
* box-sizing border-box for textInput ([6449858](https://github.com/receter/sys42/commit/6449858f19b840a9b98dc80fd60c64f07e0e8ed3))
* buttonGroupReverse align baseline ([32d9efd](https://github.com/receter/sys42/commit/32d9efde611a0d5853025d2f8009aa4bce435803))
* do not always add role button ([2a24e63](https://github.com/receter/sys42/commit/2a24e63f608a2d5b133958ff381d4cb6f128f5bd))
* remove isFullWidth from button ([a7287af](https://github.com/receter/sys42/commit/a7287af3679a63f95550b396bab3cd24151c152a))
* remove unused isDisabled prop from Button interface ([3c42114](https://github.com/receter/sys42/commit/3c42114cbd3589e9d0d140bb0dc5617f0672d1f2))

## [1.1.0](https://github.com/receter/sys42/compare/ui-v1.0.1...ui-v1.1.0) (2024-09-22)


### Features

* add size and isFullWidth to Button component ([5b95cda](https://github.com/receter/sys42/commit/5b95cda0c6ba814c5469291b64ee674b1ca0b259))
* assign role="button" when element type of a &lt;Button&gt; is not a button ([749265a](https://github.com/receter/sys42/commit/749265a58fea4a914071c03487adf7889d6438a5))
* remove react aria ([3637fda](https://github.com/receter/sys42/commit/3637fdae917c725fabf1cbb719a07d0802b9b0f0))


### Bug Fixes

* define border for button primary ([1295c01](https://github.com/receter/sys42/commit/1295c013ae581ace23a02360244c1b9bc800f9ee))
* onClick and disabled instead of onPress and isDisabled in examples and fixture ([97dc6fe](https://github.com/receter/sys42/commit/97dc6fe6f2421e0e9126ec546f0121439d65c4c6))

## [1.0.1](https://github.com/receter/sys42/compare/ui-v1.0.0...ui-v1.0.1) (2024-09-14)


### Bug Fixes

* no specific font-family and button inherits line-height ([0b134e9](https://github.com/receter/sys42/commit/0b134e9a39a27cb12bc35df9aed96128594622dc))

## 1.0.0 (2024-09-09)


### Features

* fix a few issues from renaming, switch to normalize.css, remove margin-bottom per default ([e49b02c](https://github.com/receter/sys42/commit/e49b02ce4fe3da1a5b043aae333720db21a74c38))


### Bug Fixes

* retrigger release ([9918a77](https://github.com/receter/sys42/commit/9918a777722cf1d52544bce3cf614ae05f3d1836))
* retrigger release ([6a2916e](https://github.com/receter/sys42/commit/6a2916e045dcf1dd4a5ac42d62874e7d5becd8d2))

## Changelog

## <small>0.0.5 (2024-07-11)</small>

This release includes more components, introduces helper classes and has a Button based on Adobe react-aria. Further it ships with a `base.css` file that contains a reset and some basic styles. Still very experimental and much work in progress.

## <small>0.0.4 (2024-05-23)</small>

If everything goes well, this is the first release that actually ships code :)

## <small>0.0.3 (2024-05-23)</small>

First release with hooks and components. Work in progress.

- feat: Basic content for README.md
