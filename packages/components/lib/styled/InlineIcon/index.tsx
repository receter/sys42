import { forwardRef } from "react";
import { useInlineIcon } from "./useInlineIcon";
import {
  InlineIconIconAttributes,
  InlineIconProps,
} from "../../unstyled/InlineIcon/useUnstyledInlineIcon";
import { Sys42Props } from "../../types";

export const InlineIcon = forwardRef<
  HTMLElement | SVGElement,
  Sys42Props<InlineIconIconAttributes, InlineIconProps>
>((props, forwardedRef) => {
  const { inlineIconProps, inlineIconRef, IconComponent } = useInlineIcon({
    props,
    forwardedRef,
  });
  return <IconComponent {...inlineIconProps} ref={inlineIconRef} />;
});
