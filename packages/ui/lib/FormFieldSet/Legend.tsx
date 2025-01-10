import { createComponent } from "../helpers";
import { LabelProps, useLabel } from "../Label/useLabel";

export const Legend = createComponent<LabelProps, "legend">(
  "legend",
  (hookOptions) => {
    const { elementProps, elementRef } = useLabel(hookOptions);
    return <legend {...elementProps} ref={elementRef} />;
  },
);
