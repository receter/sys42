import React, { ReactNode, useRef } from "react";
import { useButton as useReactAriaButton } from "@react-aria/button";
import { FocusableProps, PressEvents } from "@react-types/shared";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

// How to extend the props from react aria and add our own props?

// This are our props that we want to expose as an interface to the Button component

// TODO: Maybe I should remove the normal "disabled"  and "onClick"
interface ReactAriaProps extends PressEvents, FocusableProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** The content to display in the button. */
  children?: ReactNode;
}

export type BaseButtonProps<ElemProps = void> = Sys42Props<
  ReactAriaProps,
  ElemProps
>;

export type UseButtonOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseButton<
  Props extends BaseButtonProps,
  Elem extends HTMLElement,
>({ props, elementType, forwardedRef }: UseButtonOptions<Props, Elem>) {
  // When we split our props (Sys42ButtonProps) all props that remain will be props
  // that are defined in T but not in Sys42ButtonProps
  // TODO: Passed on props should only include attributes that can be passed to html
  // all react-aria specific props should be removed
  //
  const { onPress, isDisabled, ...passedOnProps } = props;

  const ref = useRef<Elem>(null);

  const reactAriaProps = {
    onPress,
    isDisabled,
    ...passedOnProps,
    elementType,
  };

  const { buttonProps: reactAriaButtonProps, isPressed: buttonIsPressed } =
    useReactAriaButton(reactAriaProps, ref);

  const buttonProps: React.HTMLAttributes<HTMLElement> = {
    ...passedOnProps,
    ...reactAriaButtonProps,
  };

  return {
    buttonProps,
    buttonIsPressed,
    buttonRef: mergeRefs([forwardedRef, ref]),
  };
}
