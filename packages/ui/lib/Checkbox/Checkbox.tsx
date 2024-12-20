import { createComponent } from "../helpers";

import { CheckboxProps, useCheckbox } from "./useCheckbox";

export const Checkbox = createComponent<CheckboxProps, "input">(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useCheckbox(hookOptions);
    return <input {...elementProps} ref={elementRef} />;
  },
);
