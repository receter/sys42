import { cn } from "@sys42/utils";

import {
  BaseLabelProps,
  useBaseLabel,
  UseBaseLabelOptions,
} from "./useBaseLabel";

import styles from "./styles.module.css";

export type LabelProps = BaseLabelProps;

export function useLabel<Props extends LabelProps>(
  options: UseBaseLabelOptions<Props>,
) {
  const label = useBaseLabel(options);

  label.elementProps.className = cn(label.elementProps.className, styles.label);

  return label;
}
