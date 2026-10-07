import { cn } from "@sys42/utils";

import { BaseSelectProps, useBaseSelect } from "./useBaseSelect";

import styles from "./styles.module.css";

export type SelectProps = BaseSelectProps;

export function useSelect(options: UseComponentOptions<SelectProps, "select">) {
  return useBaseSelect(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.select,
    );
  });
}
