import { cn } from "@sys42/utils";

import { BaseLabelProps, useBaseLabel } from "./useBaseLabel";

import styles from "./styles.module.css";

export type LabelProps = BaseLabelProps;

export function useLabel(options: UseComponentOptions<LabelProps, "label">) {
  return useBaseLabel(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.label,
    );
  });
}
