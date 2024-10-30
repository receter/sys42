import { useCallback, useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

import { OverflowMenuContext } from "./context";

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
    children,
    triggerLabel = "more",
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [menuId] = useState(() => uniqueId("sys42-overflow-menu-"));

  const wrapperRef = useRef<Elem>(null);
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

  const contextValue = {
    isOpen,
    close,
    open,
  };

  const content = (
    <OverflowMenuContext.Provider value={contextValue}>
      <button
        onClick={handleClickTrigger}
        ref={triggerButtonRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {triggerLabel}
      </button>
      <div id={menuId} ref={menuRef} role="menu" aria-hidden={!isOpen}>
        {children}
      </div>
    </OverflowMenuContext.Provider>
  );

  return {
    wrapperProps: {
      children: content,
      ...restProps,
    },
    wrapperRef: mergeRefs([forwardedRef, wrapperRef]),
    isOpen: isOpen,
  };
}
