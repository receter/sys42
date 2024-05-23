import { concatClassNames as cn } from "@sys42/utils";

import { BaseLabelProps, useBaseLabel,UseLabelOptions } from "./useBaseLabel";

import styles from "./styles.module.css";

export type LabelProps = BaseLabelProps;

export function useLabel<Props extends LabelProps>(
  options: UseLabelOptions<Props>,
) {
  const label = useBaseLabel(options);

  label.labelProps.className = cn(styles.label, label.labelProps.className);

  return label;
}
