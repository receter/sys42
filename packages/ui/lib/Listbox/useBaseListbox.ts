import { Children, Fragment, isValidElement, useId, useRef } from "react";
import { useSelect as useDownshiftSelect } from "downshift";
import { mergeRefs } from "react-merge-refs";

import { ListboxItem, ListboxItemProps } from "../ListboxItem";

import { ListboxContextType } from "./context";

export type BaseListboxProps = {
  // Only ListboxItem elements (and fragments containing them) are allowed
  children: React.ReactNode;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: React.ReactNode;
  // Renders a hidden input so the value is submitted with a form
  name?: string;
  disabled?: boolean;
  // id, aria-label and aria-labelledby are applied to the toggle button,
  // so <label htmlFor={id}> works like with a native select
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type BaseListboxContext = {
  isOpen: boolean;
  highlightedIndex: number;
  selectedItem: ListboxItemProps | null;
};

export type BaseListboxDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  toggleProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"ul">;
  inputProps: React.ComponentPropsWithoutRef<"input"> | undefined;
};

export type BaseListboxRenderArgs = {
  ctx: ListboxContextType;
  toggleProps: React.ComponentPropsWithRef<"button">;
  menuProps: React.ComponentPropsWithRef<"ul">;
  // ListboxItem elements, they render themselves using ListboxContext
  children: React.ReactNode;
  inputProps: React.ComponentPropsWithoutRef<"input"> | undefined;
};

function getItemText(item: ListboxItemProps | undefined) {
  if (!item) {
    return "";
  }
  return (
    item.textValue ?? (typeof item.children === "string" ? item.children : "")
  );
}

function collectItems(
  children: React.ReactNode,
  items: ListboxItemProps[] = [],
) {
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === Fragment) {
      collectItems(
        (child.props as { children?: React.ReactNode }).children,
        items,
      );
    } else if (isValidElement(child) && child.type === ListboxItem) {
      items.push(child.props as ListboxItemProps);
    } else {
      throw new Error(
        "sys42: Listbox only accepts ListboxItem elements as children",
      );
    }
  });
  return items;
}

export function useBaseListbox<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseListboxProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseListboxDraft<TTagName>,
    BaseListboxContext
  >,
) {
  const {
    children,
    value,
    defaultValue,
    onChange,
    placeholder,
    name,
    disabled,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...restProps
  } = props;

  const generatedId = useId();
  const toggleButtonId = id ?? `sys42-listbox-${generatedId}`;
  const menuId = `sys42-listbox-menu-${generatedId}`;

  const elementRef = useRef<HTMLElementTagNameMap[TTagName]>(null);

  const items = collectItems(children);
  const itemsByValue = new Map(items.map((item) => [item.value, item]));
  if (itemsByValue.size !== items.length) {
    throw new Error("sys42: ListboxItem values must be unique");
  }

  function toItem(value: string | null | undefined) {
    return value != null && itemsByValue.has(value) ? value : null;
  }

  const {
    isOpen,
    highlightedIndex,
    selectedItem: selectedValue,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useDownshiftSelect<string>({
    // Item values are used as downshift items, they are stable primitive values
    items: items.map((item) => item.value),
    toggleButtonId,
    menuId,
    // undefined means uncontrolled
    selectedItem: value === undefined ? undefined : toItem(value),
    initialSelectedItem: toItem(defaultValue),
    itemToString: (item) => getItemText(itemsByValue.get(item ?? "")),
    isItemDisabled: (item) => !!itemsByValue.get(item)?.disabled,
    onSelectedItemChange: ({ selectedItem }) =>
      onChange?.(selectedItem ?? null),
  });

  const selectedItem =
    selectedValue != null ? itemsByValue.get(selectedValue) ?? null : null;

  const draft: BaseListboxDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    toggleProps: {
      ...(getToggleButtonProps({
        disabled,
        "aria-label": ariaLabel,
        // Without an explicit aria-labelledby the name comes from <label for>
        "aria-labelledby": ariaLabelledBy,
      }) as React.ComponentPropsWithRef<"button">),
      type: "button",
      children: selectedItem ? selectedItem.children : placeholder,
    },
    menuProps: getMenuProps({
      "aria-label": ariaLabel,
      // A listbox labelled by its combobox would get the selected value as name,
      // so the menu is only named if aria-label or aria-labelledby is provided
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      hidden: !isOpen,
    }) as React.ComponentPropsWithRef<"ul">,
    inputProps:
      name !== undefined
        ? { type: "hidden", name, value: selectedValue ?? "" }
        : undefined,
  };

  const ctx: BaseListboxContext = {
    isOpen,
    highlightedIndex,
    selectedItem,
  };

  interceptor?.(draft, ctx);

  const listboxContext: ListboxContextType = {
    getItemProps,
    indexByValue: new Map(items.map((item, index) => [item.value, index])),
    highlightedIndex,
    selectedValue: selectedValue ?? null,
  };

  const renderArgs: BaseListboxRenderArgs = {
    ctx: listboxContext,
    toggleProps: draft.toggleProps,
    menuProps: draft.menuProps,
    children,
    inputProps: draft.inputProps,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, elementRef]),
    renderArgs,
  };
}
