## System 42

System 42 is a React-based experimental design system that offers components used similarly to typical HTML elements.

### Component Styling

System 42 features minimal opinionated styling while still allowing some customization. You can tailor the appearance of components by adjusting CSS custom properties (variables), such as tweaking the horizontal padding of buttons using `@sys42-button-p-horiz` as an example.

### Installation

1. Install the core components package:

```bash
npm install sys42/components
```

2. Install the default custom properties package (optional):

```bash
npm install sys42/default-custom-properties
```

### Getting Started

Import the desired component from the `sys42/components` package:

```jsx
import { Button } from "sys42/components";
```

Now, you can use the imported component in your application:

```jsx
<Button className="my-button-class" onClick={handleClickButton}>
  Click me!
</Button>
```

### Advanced Example

Here's an advanced example demonstrating how to use System 42 components with custom styling:

```jsx
import React from "react";
import { UnstyledButton, ButtonProps } from "sys42/components";

const CustomStyledButton = (props: ButtonProps) => {
  return (
    <UnstyledButton
      styles={{
        button: "my-custom-button-class"
      }}
      {...props}
    />
  );
};
```

### Contribution Guidelines

Feel free to open issues, submit pull requests, or discuss ideas in the GitHub repository.

### Support

If you encounter any problems or have questions, please create an issues.

### License

This project is licensed under the [MIT License](https://opensource.org/license/mit/). Please read the LICENSE file for more details.
