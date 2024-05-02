import { useButton } from '@react-aria/button';
import { concatClassNames as cn } from '@sys42/utils'

import React, { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Sys42Render } from '../types';

// This are our props that we want to expose as an interface to the Button component
interface ButtonProps {
  className?: string;
  styles: {
    button: string;
  }
}

// This are the props that we want to spread on to the rendered HTML element
type ButtonElementProps = {
  className: string;
  type?: "button" | "submit" | "reset";
};

export function ButtonAs<T, E extends HTMLElement>(
  renderFunction: Sys42Render<T, E, ButtonProps, ButtonElementProps>,
  assumedHtmlElement: keyof JSX.IntrinsicElements
) {

  return forwardRef((props: Omit<T, keyof ButtonProps> & ButtonProps, forwardedRef: React.ForwardedRef<E>) => {

    // When we split our props (ButtonProps) all props that remain will be props
    // That are defined in T but not in ButtonProps
    const {
      className,
      styles,
      ...passedOnProps
    } = props;

    const ref = useRef<E>(null);

    const { buttonProps: reactAriaButtonProps } = useButton({ ...passedOnProps, elementType: assumedHtmlElement }, ref);

    const elementProps: ButtonElementProps = {
      className: cn(
        className,
        styles.button
      ),
      ...reactAriaButtonProps
    }

    return renderFunction({
      passedOnProps,
      elementProps,
      props,
      ref: mergeRefs([forwardedRef, ref])
    });
  });

}

export const Button = ButtonAs<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>(
  ({ passedOnProps, elementProps, ref }) => <button {...passedOnProps} {...elementProps} ref={ref} />,
  "button"
);

export const ButtonA = ButtonAs<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>(
  ({ passedOnProps, elementProps, ref }) => <a {...passedOnProps} {...elementProps} ref={ref} />,
  "a"
);
