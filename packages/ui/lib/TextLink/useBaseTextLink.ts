import React, { HTMLAttributes, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

interface TextLinkProps {}

export type BaseTextLinkProps<ElemProps> = Sys42Props<TextLinkProps, ElemProps>;

export type UseBaseTextLinkOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseTextLink<
  Props extends BaseTextLinkProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseTextLinkOptions<Props, Elem>) {
  const ref = useRef<Elem>(null);

  return {
    textLinkProps: {
      ...props,
    },
    textLinkRef: mergeRefs([forwardedRef, ref]),
  };
}
