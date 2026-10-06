import {
  createContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export type UseMenuOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
};

export type MenuContextType = {
  close: (returnFocus: boolean) => void;
};

// DOC: If a context in sys42 is not available it is undefined (not null)
export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);

// "menu" focuses the menu itself without highlighting an item
type FocusTarget = "first" | "last" | "menu";

const TYPEAHEAD_TIMEOUT = 500;
const ITEM_SELECTOR = '[role="menuitem"]';

function isEnabledItem(el: HTMLElement) {
  return el.getAttribute("aria-disabled") !== "true";
}

function getItemText(el: HTMLElement) {
  return (el.dataset.textValue ?? el.textContent ?? "").trim().toLowerCase();
}

// DOC: Implements the WAI-ARIA menu button pattern
// https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
// Items are read from the DOM (elements with role="menuitem" inside the menu),
// so they can be rendered by any component. While the menu is open, DOM focus
// is on the menu items. Opening with the keyboard focuses the first (or last)
// item, opening with the pointer focuses the menu itself so only the hovered
// item is highlighted. Disabled items are skipped by keyboard navigation.
export function useMenu({ onOpen, onClose, disabled }: UseMenuOptions) {
  const id = useId();
  const triggerId = `sys42-menu-trigger-${id}`;
  const menuId = `sys42-menu-${id}`;

  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusOnOpen = useRef<FocusTarget>("first");
  const typeahead = useRef({ query: "", timeout: 0 });

  const open = useCallback(
    (focusTarget: FocusTarget) => {
      focusOnOpen.current = focusTarget;
      setIsOpen(true);
      onOpen?.();
    },
    [onOpen],
  );

  const close = useCallback(
    (returnFocus: boolean) => {
      setIsOpen(false);
      onClose?.();
      if (returnFocus) {
        triggerRef.current?.focus();
      }
    },
    [onClose],
  );

  function getEnabledItems() {
    const menu = menuRef.current;
    if (!menu) {
      return [];
    }
    return Array.from(menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
      isEnabledItem,
    );
  }

  function getFocusedItem() {
    const el = document.activeElement;
    return el instanceof HTMLElement &&
      el.matches(ITEM_SELECTOR) &&
      menuRef.current?.contains(el)
      ? el
      : null;
  }

  // Move focus into the menu once it is visible
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const items = getEnabledItems();
    if (focusOnOpen.current === "menu") {
      menuRef.current?.focus();
    } else if (focusOnOpen.current === "first") {
      (items[0] ?? menuRef.current)?.focus();
    } else {
      (items[items.length - 1] ?? menuRef.current)?.focus();
    }
  }, [isOpen]);

  // Close when clicking outside of trigger and menu
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        close(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, close]);

  function moveFocus(step: 1 | -1) {
    const items = getEnabledItems();
    if (items.length === 0) {
      return;
    }
    const focused = getFocusedItem();
    const position = focused ? items.indexOf(focused) : -1;
    const nextPosition =
      position === -1
        ? step === 1
          ? 0
          : items.length - 1
        : (position + step + items.length) % items.length;
    items[nextPosition].focus();
  }

  function handleTypeahead(char: string) {
    window.clearTimeout(typeahead.current.timeout);
    typeahead.current.timeout = window.setTimeout(() => {
      typeahead.current.query = "";
    }, TYPEAHEAD_TIMEOUT);

    const query = (typeahead.current.query + char).toLowerCase();
    typeahead.current.query = query;

    // Repeating the same character cycles through items with that character
    const isRepeat = query.split("").every((c) => c === query[0]);
    const search = isRepeat ? query[0] : query;

    const items = getEnabledItems();
    const focused = getFocusedItem();
    const focusedPosition = focused ? items.indexOf(focused) : -1;
    // A longer query may still match the focused item
    const start = Math.max(isRepeat ? focusedPosition + 1 : focusedPosition, 0);
    const ordered = [...items.slice(start), ...items.slice(0, start)];
    ordered.find((el) => getItemText(el).startsWith(search))?.focus();
  }

  function handleTriggerClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (isOpen) {
      close(false);
    } else {
      // detail is 0 for clicks triggered by Enter or Space
      open(e.detail === 0 ? "first" : "menu");
    }
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    // Enter and Space trigger a native click
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      open("last");
    }
  }

  // Items are buttons, Enter and Space activate them natively
  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = getEnabledItems();
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "Home":
      case "PageUp":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
      case "PageDown":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Escape":
        e.preventDefault();
        close(true);
        break;
      case "Tab":
        // Let focus move on naturally
        close(false);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          // Space activates the focused item (unless typeahead is in progress)
          if (e.key === " " && typeahead.current.query === "") {
            return;
          }
          e.preventDefault();
          handleTypeahead(e.key);
        }
    }
  }

  function handleMenuMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Focus follows the pointer
    const item = (e.target as HTMLElement).closest<HTMLElement>(ITEM_SELECTOR);
    if (
      item &&
      isEnabledItem(item) &&
      menuRef.current?.contains(item) &&
      document.activeElement !== item
    ) {
      item.focus();
    }
  }

  function handleMenuMouseLeave() {
    // Remove the highlight of the last hovered item
    if (getFocusedItem()) {
      menuRef.current?.focus();
    }
  }

  const triggerProps: React.ComponentPropsWithRef<"button"> = {
    ref: triggerRef,
    id: triggerId,
    type: "button",
    disabled,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": menuId,
    onClick: handleTriggerClick,
    onKeyDown: handleTriggerKeyDown,
  };

  const menuProps: React.ComponentPropsWithRef<"div"> = {
    ref: menuRef,
    id: menuId,
    role: "menu",
    "aria-labelledby": triggerId,
    // Clicks on the menu itself (padding) keep focus inside the menu
    tabIndex: -1,
    hidden: !isOpen,
    onKeyDown: handleMenuKeyDown,
    onMouseMove: handleMenuMouseMove,
    onMouseLeave: handleMenuMouseLeave,
  };

  const ctx = useMemo<MenuContextType>(() => ({ close }), [close]);

  return {
    isOpen,
    triggerProps,
    menuProps,
    ctx,
  };
}
