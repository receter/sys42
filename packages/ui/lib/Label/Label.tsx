import { createComponent } from "../helpers";

import { LabelProps, useLabel } from "./useLabel";

export const Label = createComponent<LabelProps, "label">(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef } = useLabel(hookOptions);
    return <label {...elementProps} ref={elementRef} />;
  },
);
