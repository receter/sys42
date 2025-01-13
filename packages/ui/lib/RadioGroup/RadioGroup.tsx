import { createComponent } from "../helpers";

import { renderRadioGroup } from "./render";
import { RadioGroupProps, useRadioGroup } from "./useRadioGroup";

export const RadioGroup = createComponent<RadioGroupProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useRadioGroup(hookOptions);
    return (
      <div {...elementProps} ref={elementRef}>
        {renderRadioGroup(renderArgs)}
      </div>
    );
  },
);
