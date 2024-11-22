import React, { HTMLAttributes, useContext } from "react";

import { OverflowMenuContext } from "./context";

// Define specific props for the component
interface OverflowMenu_ItemProps {}

export type BaseOverflowMenu_ItemProps<ElemProps> = Sys42Props<
  OverflowMenu_ItemProps,
  ElemProps
>;

export type UseBaseOverflowMenu_ItemOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseOverflowMenu_Item<
  Props extends BaseOverflowMenu_ItemProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseOverflowMenu_ItemOptions<Props, Elem>) {
  const overflowMenuContext = useContext(OverflowMenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    props.onClick?.(e);
    overflowMenuContext?.close();
  }

  return {
    elementProps: {
      ...props,
      onClick: handleClick,
    },
    elementRef: forwardedRef,
  };
}
