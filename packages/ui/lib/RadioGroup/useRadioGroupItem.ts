import { cn } from "@sys42/utils";

import {
  BaseRadioGroupItemProps,
  useBaseRadioGroupItem,
  UseBaseRadioGroupItemProps,
} from "./useBaseRadioGroupItem";

import styles from "./styles.module.css";

// ASSUMPTION: In this case, not generics required.
// @see useBaseRadioGroupItem
export type RadioGroupItemProps = BaseRadioGroupItemProps;

export function useRadioGroupItem<Props extends RadioGroupItemProps>(
  props: UseBaseRadioGroupItemProps<Props>,
) {
  const radioGroupItem = useBaseRadioGroupItem(props);

  radioGroupItem.labelProps.className = cn(
    radioGroupItem.labelProps.className,
    styles.radioGroupItemLabel,
  );

  // The public interface does not expose a className
  // for the input element, so we need to cast it.
  Object.assign(radioGroupItem.inputProps, {
    className: styles.radioGroupItemInput,
  });

  return radioGroupItem;
}
