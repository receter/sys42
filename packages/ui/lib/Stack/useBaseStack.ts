import React, { useMemo } from "react";

import { knownSpacingAbbreviations } from "../helpers";

// This are our props that we want to expose as an interface to the Stack component
// Further we also define attributes that the component "consumes" here
export type BaseStackProps = {
  spacing?: string;
  style?: React.CSSProperties;
};

export function useBaseStack<TagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseStackProps, TagName>,
  interceptor?: UseComponentInterceptor<TagName>,
) {
  const { spacing = "md", style, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>,
  };

  draft.elementProps.style = useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        spacingValue = `var(--sys42-spacing-${spacing})`;
      }
      return {
        ...style,
        "--sys42-stack-spacing": spacingValue,
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
