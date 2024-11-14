import { HTMLAttributes, useContext, useImperativeHandle, useRef } from "react";

import { RadioGroupContext } from "./context";

// 😅 ASSUMPTION: Because the exposed interface for `Item` is
// and extension of `label`, we don't need a generic, and
// simply need to add the props of the `input` that we care about.

// 🤔 QUESTION: In this case, we would probably want to extend the
// `Label` component? Or is this implementation correct?

// 🤔 QUESTION: I have been debating if we need to pass
// a generic to the value props for this and related components.
// My feeling is that simply ensuring it's a string is enough,
// as the consumer can handle their own type-safety if desired.
// What do you think?

export type BaseRadioGroupItemProps = Sys42Props<
  {
    value: string;
    label: string;
    name?: string;
  },
  Omit<HTMLAttributes<HTMLLabelElement>, "children">
>;

// ASSUMPTION: Same as above, we can do away with some generic as
// this component requires a label and input to be used.

export type BaseRadioGroupItemRefProps = {
  label: HTMLLabelElement | null;
  input: HTMLInputElement | null;
};

export type UseBaseRadioGroupItemProps<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<BaseRadioGroupItemRefProps>;
};

export function useBaseRadioGroupItem<Props extends BaseRadioGroupItemProps>({
  props,
  forwardedRef,
}: UseBaseRadioGroupItemProps<Props>) {
  const { value, label, name, ...passedOnProps } = props;
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }

  const { value: activeValue, onChange } = context;

  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    label: labelRef.current,
    input: inputRef.current,
  }));

  function handleChange() {
    onChange(value);
  }

  return {
    labelRef,
    labelProps: {
      ...passedOnProps,
    },
    inputRef,
    inputProps: {
      value,
      name,
      onChange: handleChange,
    },
    label,
    isChecked: activeValue === value,
  };
}
