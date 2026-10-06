import { createComponent } from "../helpers";
import { LabeledControl } from "../LabeledControl";
import { Radio } from "../Radio";

import { RadioGroupItemProps, useRadioGroupItem } from "./useRadioGroupItem";

export const RadioGroupItem = createComponent<RadioGroupItemProps, "label">(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef, radioProps } =
      useRadioGroupItem(hookOptions);
    return (
      <LabeledControl
        {...elementProps}
        ref={elementRef}
        control={<Radio {...radioProps} />}
      />
    );
  },
);
