import { cn } from "@sys42/utils";

import {
  BaseMenuButtonItemProps,
  useBaseMenuButtonItem,
} from "./useBaseMenuButtonItem";

import styles from "./styles.module.css";

export type MenuButtonItemProps = BaseMenuButtonItemProps;

export function useMenuButtonItem(
  options: UseComponentOptions<MenuButtonItemProps, "button">,
) {
  return useBaseMenuButtonItem(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.menuButtonItem,
    );
  });
}
