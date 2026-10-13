import React, { useMemo } from "react";

import { knownSpacingAbbreviations } from "../helpers";

// This are our props that we want to expose as an interface to the Stack component
// Further we also define attributes that the component "consumes" here
export type BaseStackProps = {
  spacing?: string;
  style?: React.CSSProperties;
};

export function useBaseStack<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseStackProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { spacing, style, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  // Without the prop the stylesheet resolves --stack-spacing or the semantic default
  draft.elementProps.style = useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        const size = spacing.replace(/^xx/, "2x");
        spacingValue = `var(--s42-space-gap-${size})`;
      }
      return {
        ...style,
        "--_spacing": spacingValue,
      };
    } else {
      return style;
    }
  }, [spacing, style]);

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
