import { forwardRef } from "react";
import { useInlineIcon } from "./useInlineIcon";
import {
  InlineIconIconProps,
  InlineIconProps,
} from "../../unstyled/InlineIcon/useUnstyledInlineIcon";
import { Sys42Props } from "../../types";

export const InlineIcon = forwardRef<
  HTMLElement | SVGElement,
  Sys42Props<InlineIconProps, InlineIconIconProps>
>((props, forwardedRef) => {
  const { inlineIconProps, inlineIconRef, IconComponent } = useInlineIcon({
    props,
    forwardedRef,
  });
  return <IconComponent {...inlineIconProps} ref={inlineIconRef} />;
});
