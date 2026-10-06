import { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { MenuContextType, useMenu } from "../hooks/useMenu";

export type BaseMenuButtonProps = {
  // Label of the button
  label: React.ReactNode;
  // Menu items, usually MenuButtonItem elements
  children: React.ReactNode;
  // Decorative content rendered after the label
  icon?: React.ReactNode;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export type BaseMenuButtonContext = {
  isOpen: boolean;
};

export type BaseMenuButtonDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  triggerProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export type BaseMenuButtonRenderArgs = {
  ctx: MenuContextType;
  triggerProps: React.ComponentPropsWithRef<"button">;
  icon: React.ReactNode;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export function useBaseMenuButton<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseMenuButtonProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseMenuButtonDraft<TTagName>,
    BaseMenuButtonContext
  >,
) {
  const { label, children, icon, disabled, onOpen, onClose, ...restProps } =
    props;

  const elementRef = useRef<HTMLElementTagNameMap[TTagName]>(null);

  const { isOpen, triggerProps, menuProps, ctx } = useMenu({
    onOpen,
    onClose,
    disabled,
  });

  const draft: BaseMenuButtonDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    triggerProps: {
      ...triggerProps,
      children: label,
    },
    menuProps: {
      ...menuProps,
      children,
    },
  };

  interceptor?.(draft, { isOpen });

  const renderArgs: BaseMenuButtonRenderArgs = {
    ctx,
    triggerProps: draft.triggerProps,
    icon,
    menuProps: draft.menuProps,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, elementRef]),
    renderArgs,
  };
}
