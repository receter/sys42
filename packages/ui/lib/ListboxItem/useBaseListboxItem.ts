import { useContext } from "react";

import { ListboxContext } from "../Listbox/context";

export type BaseListboxItemProps = {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  // Used for typeahead and as accessible text, required if children is not a string
  textValue?: string;
};

export type BaseListboxItemContext = {
  isHighlighted: boolean;
  isSelected: boolean;
  isDisabled: boolean;
};

// DOC: Listbox reads the props of its ListboxItem children to know all items up
// front (downshift needs them). Each ListboxItem then renders itself and
// connects to downshift through ListboxContext, using its value to look up its index.
export function useBaseListboxItem(
  { props, forwardedRef }: UseComponentOptions<BaseListboxItemProps, "li">,
  interceptor?: UseComponentInterceptor<
    "li",
    { elementProps: React.ComponentPropsWithoutRef<"li"> },
    BaseListboxItemContext
  >,
) {
  const listboxContext = useContext(ListboxContext);
  if (!listboxContext) {
    throw new Error("sys42: ListboxItem must be used inside a Listbox");
  }

  // disabled and textValue are read by Listbox from the props directly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, children, disabled, textValue, ...restProps } = props;

  const index = listboxContext.indexByValue.get(value) ?? -1;

  // getItemProps merges the forwarded ref with the ref downshift needs
  // to scroll the highlighted item into view
  const { ref: elementRef, ...itemProps } = listboxContext.getItemProps({
    item: value,
    index,
    ref: forwardedRef,
  }) as React.ComponentPropsWithRef<"li">;

  const draft = {
    elementProps: {
      ...(restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"li">),
      ...itemProps,
      children,
    },
  };

  const ctx: BaseListboxItemContext = {
    isHighlighted: index === listboxContext.highlightedIndex,
    isSelected: value === listboxContext.selectedValue,
    isDisabled: !!disabled,
  };

  interceptor?.(draft, ctx);

  return {
    elementProps: draft.elementProps,
    elementRef,
  };
}
