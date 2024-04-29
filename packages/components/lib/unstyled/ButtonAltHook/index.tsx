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

function useButton<T>(props: Omit<T, keyof ButtonProps> & ButtonProps) {

  // When we split our props (ButtonProps) all props that remain will be props
  // That are defined in T but not in ButtonProps
  const {
    styles,
    hello,
    className,
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

  return { passedOnProps, elementProps, props };
}


export const Button = (propsIn: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> & ButtonProps) => {
  const { passedOnProps, elementProps } = useButton<React.ButtonHTMLAttributes<HTMLButtonElement>>(propsIn);
  return <button {...passedOnProps} {...elementProps} />;
}

export const Button_a = (propsIn: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonProps> & ButtonProps) => {
  const { passedOnProps, elementProps } = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>>(propsIn);
  return <a {...passedOnProps} {...elementProps} />;
}

const test = <>
  <Button hello="test" styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} type="submit" href={"https://google.com"}>
    Click me
  </Button_a>
</>
