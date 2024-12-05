import { cn } from "@sys42/utils";

import {
  BaseOverflowMenuProps,
  useBaseOverflowMenu,
} from "./useBaseOverflowMenu";

import styles from "./styles.module.css";

export type OverflowMenuProps = BaseOverflowMenuProps;

export function useOverflowMenu<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<OverflowMenuProps, TTagName>,
) {
  return useBaseOverflowMenu(options, (draft, ctx) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.overflowMenu,
      ctx.isOpen && styles.overflowMenu_isOpen,
    );
  });
}
