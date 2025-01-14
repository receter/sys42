import {
  BaseCheckboxGroupProps,
  useBaseCheckboxGroup,
} from "./useBaseCheckboxGroup";

export type CheckboxGroupProps = BaseCheckboxGroupProps;

export function useCheckboxGroup<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<CheckboxGroupProps, TTagName>,
) {
  return useBaseCheckboxGroup(options);
}
