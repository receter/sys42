import { createComponent } from "../helpers";

import { renderCheckboxGroup } from "./render";
import { CheckboxGroupProps, useCheckboxGroup } from "./useCheckboxGroup";

export const CheckboxGroup = createComponent<CheckboxGroupProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } =
      useCheckboxGroup(hookOptions);
    return (
      <div {...elementProps} ref={elementRef}>
        {renderCheckboxGroup(renderArgs)}
      </div>
    );
  },
);
