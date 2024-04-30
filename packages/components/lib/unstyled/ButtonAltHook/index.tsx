import { useButton as useReactAriaButton } from '@react-aria/button';
import { concatClassNames as cn } from '@sys42/utils'

import React, { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

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

function useButton<T, E extends HTMLElement>(
  props: Omit<T, keyof ButtonProps> & ButtonProps,
  forwardedRef: React.ForwardedRef<E>,
  assumedHtmlElement: keyof JSX.IntrinsicElements
) {

  // When we split our props (ButtonProps) all props that remain will be props
  // That are defined in T but not in ButtonProps
  const {
    styles,
    hello,
    className,
    ...passedOnProps
  } = props;

  const ref = useRef<E>(null);

  const { buttonProps: reactAriaButtonProps } = useReactAriaButton({ ...passedOnProps, elementType: assumedHtmlElement }, ref);

  useEffect(() => {
    console.log(hello);
  }, [hello])

  const elementProps: Sys42ButtonElementProps = {
    className: cn(
      className,
      styles.button
    ),
    href: "https://google.com",
    ...reactAriaButtonProps
  }

  // If the element is a button and no type is provided, default to "button"
  if (
    assumedHtmlElement === "button" &&
    typeof (passedOnProps as unknown as ({ type?: string })).type === "undefined"
  ) {
    elementProps.type = "button";
  }

  return { passedOnProps, elementProps, props, ref: mergeRefs([forwardedRef, ref]) };
}

export const Button = forwardRef<HTMLButtonElement, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> & ButtonProps>((propsIn, forwardedRef) => {
  const { passedOnProps, elementProps, ref } = useButton<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>(propsIn, forwardedRef, "button");
  return <button {...passedOnProps} {...elementProps} ref={ref} />;
});

export const ButtonA = forwardRef<HTMLAnchorElement, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonProps> & ButtonProps>((propsIn, forwardedRef) => {
  const { passedOnProps, elementProps, ref } = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>(propsIn, forwardedRef, "a");
  return <a {...passedOnProps} {...elementProps} ref={ref} />;
});