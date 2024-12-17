import { cn } from "@sys42/utils";

import {
  BaseLabeledControlProps,
  useBaseLabeledControl,
} from "./useBaseLabeledControl";

import styles from "./styles.module.css";

export type LabeledControlProps = BaseLabeledControlProps;

export function useLabeledControl(
  options: UseComponentOptions<LabeledControlProps, "label">,
) {
  return useBaseLabeledControl(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.labeledControl,
    );
  });
}
