import { cn } from "@sys42/utils";

import {
  BaseCheckboxGroupItemProps,
  useBaseCheckboxGroupItem,
} from "./useBaseCheckboxGroupItem";

import styles from "./styles.module.css";

export type CheckboxGroupItemProps = BaseCheckboxGroupItemProps;

export function useCheckboxGroupItem<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<CheckboxGroupItemProps, TTagName>,
) {
  return useBaseCheckboxGroupItem(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.checkboxGroupItem,
    );
  });
}
