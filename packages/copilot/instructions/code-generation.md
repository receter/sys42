# Code Generation Instructions

When importing CSS module styles, please use the following syntax:

```javascript
import styles from "./styles.module.css";
```

If you name a CSS class for the outer most element of a component, please prefer to use the name of the component in camelCase. For example `MyComponent` should have a class name of `myComponent`.

When creating event handlers, please prefer `function handleClick() {}` over `const handleClick = () => {}`.

If you create a TypeScript type for component props, please use `type` instead of `interface`.

If you create a new component prefer to use function keyword like `function MyComponent() {}` (or `export function MyComponent() {}` if the component is exported.)

In `.tsx` files you do not need to `import React from "react"` in order to use JSX inside this file.
