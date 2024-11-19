import { HTMLAttributes, useContext } from "react";

import { RadioGroupContext } from "./context";

export type BaseRadioGroupItemProps = Sys42Props<
  {
    value: string;
    label: string;
    name?: string;
    inputRef?: React.Ref<HTMLInputElement>;
  },
  Omit<HTMLAttributes<HTMLLabelElement>, "children">
>;

export type UseBaseRadioGroupItemProps<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<HTMLLabelElement>;
};

export function useBaseRadioGroupItem<Props extends BaseRadioGroupItemProps>({
  props,
  forwardedRef,
}: UseBaseRadioGroupItemProps<Props>) {
  const { value, label, name, inputRef, ...passedOnProps } = props;
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }

  const { value: activeValue, onChange } = context;

  function handleChange() {
    onChange(value);
  }

  return {
    labelProps: {
      ref: forwardedRef,
      ...passedOnProps,
    },
    inputProps: {
      value,
      name,
      onChange: handleChange,
      ref: inputRef,
      checked: activeValue === value,
      type: "radio",
      className: "",
    },
    label,
  };
}
