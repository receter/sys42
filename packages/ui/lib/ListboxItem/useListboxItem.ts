import { cn } from "@sys42/utils";

import { BaseListboxItemProps, useBaseListboxItem } from "./useBaseListboxItem";

import styles from "./styles.module.css";

export type ListboxItemProps = BaseListboxItemProps;

export function useListboxItem(
  options: UseComponentOptions<ListboxItemProps, "li">,
) {
  return useBaseListboxItem(options, (draft, ctx) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.listboxItem,
      ctx.isHighlighted && styles.listboxItem_isHighlighted,
      ctx.isSelected && styles.listboxItem_isSelected,
    );
  });
}
