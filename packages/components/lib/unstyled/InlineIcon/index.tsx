import { forwardRef } from "react";
import {
  UnstyledInlineIconProps,
  useUnstyledInlineIcon,
} from "./useUnstyledInlineIcon";

export const InlineIcon = forwardRef<
  HTMLElement | SVGElement,
  UnstyledInlineIconProps
>((props, forwardedRef) => {
  const { inlineIconProps, inlineIconRef, IconComponent } =
    useUnstyledInlineIcon({
      props,
      forwardedRef,
    });
  return <IconComponent {...inlineIconProps} ref={inlineIconRef} />;
});
