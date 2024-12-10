import { cn } from "@sys42/utils";

import {
  BaseRadioGroupItemProps,
  useBaseRadioGroupItem,
  UseBaseRadioGroupItemProps,
} from "./useBaseRadioGroupItem";

import styles from "./styles.module.css";

export type RadioGroupItemProps = BaseRadioGroupItemProps;

export function useRadioGroupItem<Props extends RadioGroupItemProps>(
  props: UseBaseRadioGroupItemProps<Props>,
) {
  const radioGroupItem = useBaseRadioGroupItem(props);

  radioGroupItem.labelProps.className = cn(
    radioGroupItem.labelProps.className,
    styles.radioGroupItemLabel,
  );

  radioGroupItem.inputProps.className = styles.radioGroupItemInput;

  return radioGroupItem;
}
