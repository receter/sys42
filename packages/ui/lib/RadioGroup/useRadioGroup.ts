import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseRadioGroupProps,
  useBaseRadioGroup,
  UseBaseRadioGroupProps,
} from "./useBaseRadioGroup";
import { BaseRadioGroupItemRefProps } from "./useBaseRadioGroupItem";

import styles from "./styles.module.css";

export type RadioGroupProps<ElemProps> = BaseRadioGroupProps<ElemProps>;
export type RadioGroupItemRefProps = BaseRadioGroupItemRefProps;

export function useRadioGroup<
  Props extends RadioGroupProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseRadioGroupProps<Props, Elem>) {
  const radioGroup = useBaseRadioGroup(options);

  radioGroup.radioGroupProps.className = cn(
    radioGroup.radioGroupProps.className,
    styles.radioGroup,
  );

  return radioGroup;
}
