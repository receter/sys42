import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseRadioGroupProps,
  useBaseRadioGroup,
  UseBaseRadioGroupProps,
} from "./useBaseRadioGroup";

import styles from "./styles.module.css";

export type RadioGroupProps<ElemProps> = BaseRadioGroupProps<ElemProps>;

export function useRadioGroup<
  Props extends RadioGroupProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseRadioGroupProps<Props, Elem>) {
  const radioGroup = useBaseRadioGroup(options);

  radioGroup.elementProps.className = cn(
    radioGroup.elementProps.className,
    styles.radioGroup,
  );

  return radioGroup;
}
