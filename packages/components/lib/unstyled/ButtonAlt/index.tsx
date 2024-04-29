import { concatClassNames as cn } from '@sys42/utils'

import React, { ReactNode, useEffect } from 'react';

// This are our props that we want to expose as an interface to the Button component
interface ButtonProps {
  hello: string;
  className?: string;
  styles: {
    button: string;
  }
}

// This are the props that we want to spread on to the rendered HTML element
type Sys42ButtonElementProps = {
  className: string;
  href: string;
  type?: "button" | "submit" | "reset";
};

export function ButtonAs<T>(
  render: (
    passedOnProps: Omit<T, keyof ButtonProps>,
    elementProps: Sys42ButtonElementProps,
    props: T & ButtonProps
  ) => ReactNode,
  assumedHtmlElement?: keyof JSX.IntrinsicElements
) {
  function Button(props: T & ButtonProps) {

    // When we split our props (ButtonProps) all props that remain will be props
    // That are defined in T but not in ButtonProps
    const {
      hello,
      className,
      styles,
      ...passedOnProps
    } = props;

    useEffect(() => {
      console.log(hello);
    }, [hello])

    const elementProps: Sys42ButtonElementProps = {
      className: cn(
        className,
        styles.button
      ),
      href: "https://google.com",
    }

    // If the element is a button and no type is provided, default to "button"
    if (
      assumedHtmlElement === "button" &&
      typeof (passedOnProps as unknown as ({ type?: string })).type === "undefined"
    ) {
      elementProps.type = "button";
    }

    return render(passedOnProps, elementProps, props);
  }
  return Button;
}

export const Button_a = ButtonAs<React.AnchorHTMLAttributes<HTMLAnchorElement>>((elementProps, props42) => <a {...elementProps} {...props42} />);
export const Button = ButtonAs<React.ButtonHTMLAttributes<HTMLButtonElement>>((elementProps, props42) => <button {...elementProps} {...props42} />);

const test = <>
  <Button hello="test" styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} type="submit" href={"https://google.com"}>
    Click me
  </Button_a>
</>
