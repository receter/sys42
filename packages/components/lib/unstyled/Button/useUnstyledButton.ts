import React, { useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useButton as useReactAriaButton } from '@react-aria/button';

// This are our props that we want to expose as an interface to the Button component
type OurButtonProps = {
  onPress?: () => void;
}

export type Sys42ButtonProps<T> = Omit<T, keyof OurButtonProps> & OurButtonProps

export type UseButtonArgs<T, E extends HTMLElement> = [
  Sys42ButtonProps<T>,
  keyof JSX.IntrinsicElements,
  React.ForwardedRef<E>,
]

export function useUnstyledButton<T, E extends HTMLElement>(
  ...args: UseButtonArgs<T, E>
) {

  const [props, assumedHtmlElement, forwardedRef] = args;

  // When we split our props (Sys42ButtonProps) all props that remain will be props
  // that are defined in T but not in Sys42ButtonProps
  const {
    onPress,
    ...passedOnProps
  } = props;

  const ref = useRef<E>(null);

  const reactAriaProps = {
    onPress,
    elementType: assumedHtmlElement,
    ...passedOnProps
  };

  const { buttonProps: reactAriaButtonProps } = useReactAriaButton(reactAriaProps, ref);

  const buttonProps: React.HTMLAttributes<HTMLElement> = {
    ...passedOnProps,
    ...reactAriaButtonProps,
  }

  return { buttonProps, ref: mergeRefs([forwardedRef, ref]) };
}