import { forwardRef, HTMLAttributes } from "react";

import { RadioGroupContext } from "./context";
import {
  RadioGroupItemRefProps,
  RadioGroupProps,
  useRadioGroup,
} from "./useRadioGroup";
import { RadioGroupItemProps, useRadioGroupItem } from "./useRadioGroupItem";

const Group = forwardRef<
  HTMLDivElement,
  RadioGroupProps<HTMLAttributes<HTMLDivElement>>
>((props, forwardedRef) => {
  const { ctx, radioGroupProps, radioGroupRef } = useRadioGroup({
    props,
    forwardedRef,
  });
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div {...radioGroupProps} ref={radioGroupRef} />
    </RadioGroupContext.Provider>
  );
});

const Item = forwardRef<RadioGroupItemRefProps, RadioGroupItemProps>(
  (props, forwardedRef) => {
    const { label, labelProps, labelRef, inputProps, inputRef, isChecked } =
      useRadioGroupItem({
        props,
        forwardedRef,
      });
    return (
      <label ref={labelRef} {...labelProps}>
        <input
          type="radio"
          ref={inputRef}
          checked={isChecked}
          {...inputProps}
        />
        {/* QUESTION: Not entirely sure how we should return this. Alternative would be to return input as a child + label from the baseHook? */}
        {label}
      </label>
    );
  },
);

export const RadioGroup = Object.assign(Group, {
  Item,
});
