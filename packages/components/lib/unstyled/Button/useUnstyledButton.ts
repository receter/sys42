import React, { useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useButton as useReactAriaButton } from '@react-aria/button';
import { Sys42Props } from '../../types';

// This are our props that we want to expose as an interface to the Button component
export type ButtonProps = {
  onPress?: () => void;
}

export type UseButtonOptions<ElemAttr, Elem extends HTMLElement> = {
  props: Sys42Props<ElemAttr, ButtonProps>,
  elementType: keyof JSX.IntrinsicElements,
  forwardedRef: React.ForwardedRef<Elem>,
}

export function useUnstyledButton<ElemAttr, Elem extends HTMLElement>(
  { props, elementType, forwardedRef }: UseButtonOptions<ElemAttr, Elem>
) {

  // When we split our props (Sys42ButtonProps) all props that remain will be props
  // that are defined in T but not in Sys42ButtonProps
  const {
    onPress,
    ...passedOnProps
  } = props;

  const ref = useRef<Elem>(null);

  const reactAriaProps = {
    onPress,
    elementType,
    ...passedOnProps
  };

  const { buttonProps: reactAriaButtonProps } = useReactAriaButton(reactAriaProps, ref);

  const buttonProps: React.HTMLAttributes<HTMLElement> = {
    ...passedOnProps,
    ...reactAriaButtonProps,
  }

  return { buttonProps, buttonRef: mergeRefs([forwardedRef, ref]) };
}