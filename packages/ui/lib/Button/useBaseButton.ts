import React, { HTMLAttributes, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

// This are our props that we want to expose as an interface to the Button component
interface ButtonProps {}

export type BaseButtonProps<ElemProps> = Sys42Props<ButtonProps, ElemProps>;

export type UseBaseButtonOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseButton<
  Props extends BaseButtonProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, elementType, forwardedRef }: UseBaseButtonOptions<Props, Elem>) {
  const ref = useRef<Elem>(null);

  return {
    buttonProps: {
      type: elementType === "button" ? "button" : undefined,
      ...props,
    },
    buttonRef: mergeRefs([forwardedRef, ref]),
  };
}
