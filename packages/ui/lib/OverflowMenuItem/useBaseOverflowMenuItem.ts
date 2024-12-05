import React, { useContext } from "react";

import { OverflowMenuContext } from "../OverflowMenu/context";

export interface BaseOverflowMenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function useBaseOverflowMenuItem(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseOverflowMenuItemProps, "button">,
  interceptor?: UseComponentInterceptor<"button">,
) {
  const overflowMenuContext = useContext(OverflowMenuContext);

  const { onClick, ...restProps } = props;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    overflowMenuContext?.close();
  }

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"button">,
  };

  draft.elementProps.onClick = handleClick;

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
