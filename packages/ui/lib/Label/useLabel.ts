import { cn } from "@sys42/utils";

import { BaseLabelProps, useBaseLabel } from "./useBaseLabel";

import styles from "./styles.module.css";

export type LabelProps = BaseLabelProps;

export function useLabel<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<LabelProps, TTagName>,
) {
  return useBaseLabel(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.label,
    );
  });
}
