import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseOverflowMenu_ItemProps,
  useBaseOverflowMenu_Item,
  UseBaseOverflowMenu_ItemOptions,
} from "./useBaseOverflowMenu_Item";

import styles from "./styles.module.css";

export type OverflowMenu_ItemProps<ElemProps> =
  BaseOverflowMenu_ItemProps<ElemProps>;

export function useOverflowMenu_Item<
  Props extends OverflowMenu_ItemProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseOverflowMenu_ItemOptions<Props, Elem>) {
  const overflowMenu_Item = useBaseOverflowMenu_Item(options);

  overflowMenu_Item.elementProps.className = cn(
    overflowMenu_Item.elementProps.className,
    styles.overflowMenu_Item,
  );

  return overflowMenu_Item;
}
