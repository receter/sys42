import { concatClassNames as cn } from "@sys42/utils";
import {
  UseLabelOptions,
  UnstyledLabelProps,
  useUnstyledLabel,
} from "./useUnstyledLabel";

import styles from "./styles.module.css";

export type LabelProps = UnstyledLabelProps;

export function useLabel<Props extends LabelProps>(
  options: UseLabelOptions<Props>,
) {
  const label = useUnstyledLabel(options);

  label.labelProps.className = cn(styles.label, label.labelProps.className);

  return label;
}
