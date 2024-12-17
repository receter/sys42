import { cn } from "@sys42/utils";

import { BaseCheckboxProps, useBaseCheckbox } from "./useBaseCheckbox";

import styles from "./styles.module.css";

export type CheckboxProps = BaseCheckboxProps;

export function useCheckbox(
  options: UseComponentOptions<CheckboxProps, "input">,
) {
  return useBaseCheckbox(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.checkbox,
    );
  });
}
