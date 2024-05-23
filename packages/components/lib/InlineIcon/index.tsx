import { forwardRef } from "react";
import { useInlineIcon, InlineIconProps } from "./useInlineIcon";

export const InlineIcon = forwardRef<HTMLElement | SVGElement, InlineIconProps>(
  (props, forwardedRef) => {
    const { inlineIconProps, inlineIconRef, IconComponent } = useInlineIcon({
      props,
      forwardedRef,
    });
    return <IconComponent {...inlineIconProps} ref={inlineIconRef} />;
  },
);
