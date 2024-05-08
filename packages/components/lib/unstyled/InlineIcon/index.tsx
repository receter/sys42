import { forwardRef } from "react";
import {
  InlineIconIconAttributes,
  InlineIconProps,
  useUnstyledInlineIcon,
} from "./useUnstyledInlineIcon";
import { Sys42Props } from "../../types";

export const InlineIcon = forwardRef<
  HTMLElement | SVGElement,
  Sys42Props<InlineIconIconAttributes, InlineIconProps>
>((props, forwardedRef) => {
  const { inlineIconProps, inlineIconRef, IconComponent } =
    useUnstyledInlineIcon({
      props,
      forwardedRef,
    });
  return <IconComponent {...inlineIconProps} ref={inlineIconRef} />;
});
