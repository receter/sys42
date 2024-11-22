import { useCallback, useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
import { mergeRefs } from "react-merge-refs";

// This are our props that we want to expose as an interface to the Button component
interface OverflowMenuProps {
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  triggerLabel?: string | React.ReactNode;
}

export type BaseOverflowMenuProps<ElemProps> = Sys42Props<
  OverflowMenuProps,
  ElemProps
>;

export type UseBaseOverflowMenuOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseOverflowMenu<
  Props extends OverflowMenuProps,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseOverflowMenuOptions<Props, Elem>) {
  const {
    onClose,
    onOpen,
    triggerLabel = "more",
    children,
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [menuId] = useState(() => uniqueId("sys42-overflow-menu-"));

  const overflowMenuRef = useRef<Elem>(null);
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

  const ctx = {
    isOpen,
    close,
    open,
    menuId,
  };

  return {
    elementProps: {
      ...restProps,
    },
    elementRef: mergeRefs([forwardedRef, overflowMenuRef]),
    renderArgs: {
      ctx,
      triggerProps: {
        onClick: handleClickTrigger,
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        "aria-controls": menuId,
        children: triggerLabel,
      } satisfies React.ButtonHTMLAttributes<HTMLButtonElement>,
      triggerRef: triggerButtonRef,
      menuProps: {
        id: menuId,
        role: "menu",
        "aria-hidden": !isOpen,
        children,
      } satisfies React.HTMLAttributes<HTMLDivElement>,
      menuRef: menuRef,
    },
  };
}
