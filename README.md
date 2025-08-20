# System 42

System 42 is a collection of principles, components, and utilities that are designed to work together to make it easier to build consistent, accessible, and performant UIs for web applications.

The component library @sys42/ui can be used right out of the box or serve as a foundation for building your own component library.

You can find a deployed list of components at: https://receter.github.io/sys42/

## Packages

This is a monorepo managed with PNPM. It contains the following packages:

- `@sys42/ui`: React component library
- `@sys42/utils`: Utility library
- `@sys42/copilot`: A collection of markdown files that serve as instructions for AI assistants

Further the monorepo includes an example project that uses the component library: `example-consumer`.

## Technical Simplicity

To avoid overly complex setups and reduce maintenance overhead, I chose the following technologies with [minimal configuration](#minimal-configuration):

- Vite (library mode)
- TypeScript
- React
- CSS Modules
- CSS Custom Properties

The project uses Prettier for code formatting and ESLint for linting and import sorting.

## Extensibility

Work in progress. This section will be updated once the project is in a more mature state.

- How to add components
- How to build a System 42 component

## Principles

### Embrace HTML

When building components, prefer to use existing HTML elements and attributes over custom solutions. Most of that stuff has been well designed and thought through by the Web community and is accessible by default.

### CSS Custom Properties

### CSS Modules

https://github.com/css-modules/css-modules

### margin-top

https://dev.to/receter/why-i-fell-in-love-with-margin-top-3flg

## Minimal configuration

## Contribution Guidelines

Feel free to open issues, submit pull requests, or discuss ideas in the GitHub repository.

## Support

If you encounter any problems or have questions, please create an issues.

## Projects using System 42

- https://github.com/receter/focus-log-extension
- https://github.com/receter/gym-tracker

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/). Please read the LICENSE file for more details.
