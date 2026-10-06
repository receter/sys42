import { useContext } from "react";

import { MenuContext } from "./useMenu";

export type UseMenuItemOptions = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  // Used for typeahead if the text content is not suitable (e.g. includes an icon)
  textValue?: string;
};

// DOC: Shared behavior of items in menus created with useMenu
// (OverflowMenuItem, SplitButtonItem, MenuButtonItem). Returns props for a
// <button> element, Enter and Space activate it natively.
export function useMenuItem({
  onClick,
  disabled,
  textValue,
}: UseMenuItemOptions) {
  const menuContext = useContext(MenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }
    // Close first, so focus changes in onClick (e.g. opening a dialog) are kept
    menuContext?.close(true);
    onClick?.(e);
  }

  const itemProps: React.ComponentPropsWithoutRef<"button"> & {
    "data-text-value"?: string;
  } = {
    type: "button",
    role: "menuitem",
    // Focus is managed by the menu (roving focus)
    tabIndex: -1,
    // aria-disabled instead of disabled keeps the item perceivable
    "aria-disabled": disabled || undefined,
    "data-text-value": textValue,
    onClick: handleClick,
  };

  return itemProps;
}
