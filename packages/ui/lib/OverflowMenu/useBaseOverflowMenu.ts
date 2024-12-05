import { useCallback, useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
import { mergeRefs } from "react-merge-refs";

import { OverflowMenuContextType } from "./context";

export type BaseOverflowMenuProps = {
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  triggerLabel?: string | React.ReactNode;
};

export type BaseOverflowMenuDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  menuProps: React.HTMLAttributes<HTMLDivElement>;
};

export type BaseOverflowMenuRenderArgs = {
  ctx: OverflowMenuContextType;
  triggerProps: React.ComponentPropsWithoutRef<"button">;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuProps: React.ComponentPropsWithoutRef<"div">;
  menuRef: React.RefObject<HTMLDivElement>;
};

export function useBaseOverflowMenu<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseOverflowMenuProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseOverflowMenuDraft<TTagName>,
    OverflowMenuContextType
  >,
) {
  const {
    onClose,
    onOpen,
    triggerLabel = "more",
    children,
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [menuId] = useState(() => uniqueId("sys42-overflow-menu-"));

  const elementRef = useRef<HTMLElementTagNameMap[TTagName]>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  const open = useCallback(() => {
    onOpen?.();
    setIsOpen(true);
  }, [onOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    function handleMouseUp(e: MouseEvent) {
      if (
        triggerButtonRef.current &&
        !triggerButtonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  function handleClickTrigger() {
    isOpen ? close() : open();
  }

  const draft: BaseOverflowMenuDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    triggerProps: {
      onClick: handleClickTrigger,
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      "aria-controls": menuId,
      children: triggerLabel,
    },
    menuProps: {
      id: menuId,
      role: "menu",
      "aria-hidden": !isOpen,
      children,
    },
  };

  const ctx: OverflowMenuContextType = {
    isOpen,
    close,
    open,
    menuId,
  };

  interceptor?.(draft, ctx);

  const renderArgs: BaseOverflowMenuRenderArgs = {
    ctx,
    triggerProps: draft.triggerProps,
    triggerRef: triggerButtonRef,
    menuProps: draft.menuProps,
    menuRef: menuRef,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, elementRef]),
    renderArgs,
  };
}
