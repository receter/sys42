import { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { MenuContextType, useMenu } from "../hooks/useMenu";

export type BaseOverflowMenuProps = {
  // Menu items, usually OverflowMenuItem elements
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  // Accessible name of the trigger (it shows only the icon)
  label?: string;
  // Decorative content of the trigger
  icon?: React.ReactNode;
};

export type BaseOverflowMenuContext = {
  isOpen: boolean;
};

export type BaseOverflowMenuDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  triggerProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export type BaseOverflowMenuRenderArgs = {
  ctx: MenuContextType;
  triggerProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export function useBaseOverflowMenu<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseOverflowMenuProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseOverflowMenuDraft<TTagName>,
    BaseOverflowMenuContext
  >,
) {
  const {
    children,
    onClose,
    onOpen,
    label = "More actions",
    icon = "⋯",
    ...restProps
  } = props;

  const elementRef = useRef<HTMLElementTagNameMap[TTagName]>(null);

  const { isOpen, triggerProps, menuProps, ctx } = useMenu({
    onOpen,
    onClose,
  });

  const draft: BaseOverflowMenuDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    triggerProps: {
      ...triggerProps,
      "aria-label": label,
      children: icon,
    },
    menuProps: {
      ...menuProps,
      children,
    },
  };

  interceptor?.(draft, { isOpen });

  const renderArgs: BaseOverflowMenuRenderArgs = {
    ctx,
    triggerProps: draft.triggerProps,
    menuProps: draft.menuProps,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, elementRef]),
    renderArgs,
  };
}
