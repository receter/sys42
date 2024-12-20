import { createComponent } from "../helpers";

import { renderLabeledControl } from "./render";
import { LabeledControlProps, useLabeledControl } from "./useLabeledControl";

export const LabeledControl = createComponent<LabeledControlProps, "label">(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } =
      useLabeledControl(hookOptions);
    return (
      <label {...elementProps} ref={elementRef}>
        {renderLabeledControl(renderArgs)}
      </label>
    );
  },
);
