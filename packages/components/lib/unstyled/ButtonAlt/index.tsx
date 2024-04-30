import { useButton as useReactAriaButton } from '@react-aria/button';
import { concatClassNames as cn } from '@sys42/utils'

import React, { ReactNode, forwardRef, useEffect, useRef } from 'react';
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

export function ButtonAs<T, E extends HTMLElement>(
  render: (
    args: {
      // XXX why does "Omit<Omit<T, keyof ButtonProps>, keyof ButtonProps>," work and "Omit<T, keyof ButtonProps>," does not?
      passedOnProps: Omit<Omit<T, keyof ButtonProps>, keyof ButtonProps>,
      elementProps: Sys42ButtonElementProps,
      ref: (instance: E | null) => void,
      props: Omit<T, keyof ButtonProps> & ButtonProps
    }
  ) => ReactNode,
  assumedHtmlElement: keyof JSX.IntrinsicElements
) {

  const Component = forwardRef((props: Omit<T, keyof ButtonProps> & ButtonProps, forwardedRef: React.ForwardedRef<E>) => {

    // When we split our props (ButtonProps) all props that remain will be props
    // That are defined in T but not in ButtonProps
    const {
      hello,
      className,
      styles,
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

    return render({
      passedOnProps,
      elementProps,
      props,
      ref: mergeRefs([forwardedRef, ref])
    });
  });

  return Component;
}

export const Button = ButtonAs<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>(
  ({ passedOnProps, elementProps, ref }) => <button {...passedOnProps} {...elementProps} ref={ref} />,
  "button"
);
export const ButtonA = ButtonAs<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>(
  ({ passedOnProps, elementProps, ref }) => <a {...passedOnProps} {...elementProps} ref={ref} />,
  "a"
);
