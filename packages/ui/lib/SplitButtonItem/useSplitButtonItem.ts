import { cn } from "@sys42/utils";

import {
  BaseSplitButtonItemProps,
  useBaseSplitButtonItem,
} from "./useBaseSplitButtonItem";

import styles from "./styles.module.css";

export type SplitButtonItemProps = BaseSplitButtonItemProps;

export function useSplitButtonItem(
  options: UseComponentOptions<SplitButtonItemProps, "button">,
) {
  return useBaseSplitButtonItem(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.splitButtonItem,
    );
  });
}
