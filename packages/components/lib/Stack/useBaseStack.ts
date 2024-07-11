import React, { HTMLAttributes, useMemo, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { knownSpacingAbbreviations } from "../helpers";
import { Sys42Props } from "../types";

// This are our props that we want to expose as an interface to the Stack component
// Further we also define attributes that the component "consumes" here
export type BaseStackProps<ElemProps> = Sys42Props<
  {
    spacing?: string;
    style?: React.CSSProperties;
  },
  ElemProps
>;

export type UseBaseStackOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseStack<
  Props extends BaseStackProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseStackOptions<Props, Elem>) {
  // When we split our props (StackProps) all props that remain will be props
  // that are defined in ElemAttr but not in StackProps
  const { spacing = "md", style: passedStyle, ...passedOnProps } = props;

  const ref = useRef<Elem>(null);

  const style = useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        spacingValue = `var(--sys42-spacing-${spacing})`;
      }
      return {
        ...passedStyle,
        "--sys42-stack-spacing": spacingValue,
      };
    } else {
      return passedStyle;
    }
  }, [spacing, passedStyle]);

  const stackProps: React.HTMLAttributes<HTMLElement> = {
    style,
    ...passedOnProps,
  };

  return { stackProps, stackRef: mergeRefs([forwardedRef, ref]) };
}
