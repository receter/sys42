import { cn } from "@sys42/utils";

import {
  BaseRadioGroupItemProps,
  useBaseRadioGroupItem,
} from "./useBaseRadioGroupItem";

import styles from "./styles.module.css";

export type RadioGroupItemProps = BaseRadioGroupItemProps;

export function useRadioGroupItem<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<RadioGroupItemProps, TTagName>,
) {
  return useBaseRadioGroupItem(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.radioGroupItem,
    );
  });
}
