import { cn } from "@sys42/utils";

import {
  BaseOverflowMenuItemProps,
  useBaseOverflowMenuItem,
} from "./useBaseOverflowMenuItem";

import styles from "./styles.module.css";

export type OverflowMenuItemProps = BaseOverflowMenuItemProps;

export function useOverflowMenuItem(
  options: UseComponentOptions<OverflowMenuItemProps, "button">,
) {
  return useBaseOverflowMenuItem(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.overflowMenuItem,
    );
  });
}
