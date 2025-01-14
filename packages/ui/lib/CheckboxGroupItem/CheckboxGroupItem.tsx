import { createComponent } from "../helpers";
import { LabeledControl } from "../LabeledControl";
import { Checkbox } from "../main";

import {
  CheckboxGroupItemProps,
  useCheckboxGroupItem,
} from "./useCheckboxGroupItem";

export const CheckboxGroupItem = createComponent<
  CheckboxGroupItemProps,
  "label"
>("label", (hookOptions) => {
  const { elementProps, elementRef, checkboxProps } =
    useCheckboxGroupItem(hookOptions);
  return (
    <LabeledControl
      {...elementProps}
      ref={elementRef}
      control={<Checkbox {...checkboxProps} />}
    />
  );
});
