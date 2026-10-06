import { cn } from "@sys42/utils";

import { BaseListboxProps, useBaseListbox } from "./useBaseListbox";

import styles from "./styles.module.css";

export type ListboxProps = BaseListboxProps;

export function useListbox<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<ListboxProps, TTagName>,
) {
  return useBaseListbox(options, (draft, ctx) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.listbox,
      ctx.isOpen && styles.listbox_isOpen,
    );
    draft.toggleProps.className = cn(
      draft.toggleProps.className,
      styles.toggle,
      !ctx.selectedItem && styles.toggle_isPlaceholder,
    );
    draft.menuProps.className = cn(draft.menuProps.className, styles.menu);
  });
}
