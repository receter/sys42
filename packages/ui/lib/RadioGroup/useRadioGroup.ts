import { BaseRadioGroupProps, useBaseRadioGroup } from "./useBaseRadioGroup";

export type RadioGroupProps = BaseRadioGroupProps;

export function useRadioGroup<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<RadioGroupProps, TTagName>,
) {
  return useBaseRadioGroup(options);
}
