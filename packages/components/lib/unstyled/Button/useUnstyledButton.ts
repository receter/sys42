import { useButton as useReactAriaButton } from '@react-aria/button';

import React, { useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

// This are our props that we want to expose as an interface to the Button component
interface ButtonProps {
}

export function useUnstyledButton<T, E extends HTMLElement>(
  props: Omit<T, keyof ButtonProps> & ButtonProps,
  assumedHtmlElement: keyof JSX.IntrinsicElements,
  forwardedRef?: React.ForwardedRef<E>,
) {

  // When we split our props (ButtonProps) all props that remain will be props
  // that are defined in T but not in ButtonProps
  const {
    ...passedOnProps
  } = props;

  const ref = useRef<E>(null);

  const { buttonProps: reactAriaButtonProps } = useReactAriaButton({ ...passedOnProps, elementType: assumedHtmlElement }, ref);

  const buttonProps = {
    ...passedOnProps,
    ...reactAriaButtonProps,
  }

  return { buttonProps, ref: mergeRefs([forwardedRef, ref]) };
}