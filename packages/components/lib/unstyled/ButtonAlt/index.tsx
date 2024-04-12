import { concatClassNames as cn } from '@sys42/utils'

import React, { JSXElementConstructor, forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function as<T extends (keyof JSX.IntrinsicElements | JSXElementConstructor<any>)>(Element: React.ElementType<any>) {

  return forwardRef((
    props: React.ComponentProps<T> & {
      styles: {
        button: string,
      }
    },
    ref: React.ForwardedRef<typeof Element>
  ) => {

    const {
      className,
      styles,
      type,
      ...restProps
    } = props;

    // Always specify the type attribute for the <button> element. Different 
    // browsers may use different default types for the <button> element.
    const typeButton = Element === 'button' ? (type ?? 'button') : type;

    return <Element
      className={cn(
        className,
        styles.button,
      )}
      type={typeButton}
      ref={ref}
      {...restProps}
    />
  });

}

const Component = as<"button">("button");

const Button: typeof Component & {
  as?: typeof as;
} = Component;

Button.as = as;

export {
  Button
};

const Button_a = Button.as<"a">("a");

const test = <>
  <Button styles={{ button: "asdf" }} href="asdf" onClick={() => { }}>
    Click me
  </Button>

  <Button_a styles={{ button: "asdf" }} href={"https://google.com"}>
    Click me
  </Button_a>
</>