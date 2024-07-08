import React, { ReactNode, useRef } from "react";
import { useButton as useReactAriaButton } from "@react-aria/button";
import { FocusableProps, PressEvents } from "@react-types/shared";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

// This are our props that we want to expose as an interface to the Button component
interface ButtonProps extends PressEvents, FocusableProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** The content to display in the button. */
  children?: ReactNode;
}

export type BaseButtonProps<ElemProps = void> = Sys42Props<
  ButtonProps,
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
  const ref = useRef<Elem>(null);

  const { buttonProps, isPressed: buttonIsPressed } = useReactAriaButton(
    {
      ...props,
      elementType,
    },
    ref,
  );

  return {
    buttonProps: { ...buttonProps, children: props.children },
    buttonIsPressed,
    buttonRef: mergeRefs([forwardedRef, ref]),
  };
}
