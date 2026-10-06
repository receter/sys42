import { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { MenuContextType, useMenu } from "../hooks/useMenu";

export type BaseSplitButtonProps = {
  // Label of the main button
  label: React.ReactNode;
  // Handler of the main button
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // Alternative actions shown in the dropdown, usually SplitButtonItem elements
  children: React.ReactNode;
  disabled?: boolean;
  // Accessible name of the toggle button (it shows only the icon)
  toggleLabel?: string;
  // Decorative content of the toggle button
  toggleIcon?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
};

export type BaseSplitButtonContext = {
  isOpen: boolean;
};

export type BaseSplitButtonDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  buttonProps: React.ComponentPropsWithoutRef<"button">;
  toggleProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export type BaseSplitButtonRenderArgs = {
  ctx: MenuContextType;
  buttonProps: React.ComponentPropsWithoutRef<"button">;
  toggleProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"div">;
};

export function useBaseSplitButton<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseSplitButtonProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseSplitButtonDraft<TTagName>,
    BaseSplitButtonContext
  >,
) {
  const {
    label,
    onClick,
    children,
    disabled,
    toggleLabel = "More actions",
    toggleIcon = "▾",
    onOpen,
    onClose,
    ...restProps
  } = props;

  const elementRef = useRef<HTMLElementTagNameMap[TTagName]>(null);

  const { isOpen, triggerProps, menuProps, ctx } = useMenu({
    onOpen,
    onClose,
    disabled,
  });

  const draft: BaseSplitButtonDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    buttonProps: {
      type: "button",
      onClick,
      disabled,
      children: label,
    },
    toggleProps: {
      ...triggerProps,
      "aria-label": toggleLabel,
      children: toggleIcon,
    },
    menuProps: {
      ...menuProps,
      children,
    },
  };

  interceptor?.(draft, { isOpen });

  const renderArgs: BaseSplitButtonRenderArgs = {
    ctx,
    buttonProps: draft.buttonProps,
    toggleProps: draft.toggleProps,
    menuProps: draft.menuProps,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, elementRef]),
    renderArgs,
  };
}
