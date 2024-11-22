import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseOverflowMenuProps,
  useBaseOverflowMenu,
  UseBaseOverflowMenuOptions,
} from "./useBaseOverflowMenu";

import styles from "./styles.module.css";

export type OverflowMenuProps<ElemProps> = BaseOverflowMenuProps<ElemProps>;

export function useOverflowMenu<
  Props extends OverflowMenuProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseOverflowMenuOptions<Props, Elem>) {
  const overflowMenu = useBaseOverflowMenu(options);

  overflowMenu.elementProps.className = cn(
    overflowMenu.elementProps.className,
    styles.overflowMenu,
    overflowMenu.renderArgs.ctx.isOpen && styles.overflowMenu_isOpen,
  );

  return overflowMenu;
}
