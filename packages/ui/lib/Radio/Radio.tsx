import { createComponent } from "../helpers";

import { RadioProps, useRadio } from "./useRadio";

export const Radio = createComponent<RadioProps, "input">(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useRadio(hookOptions);
    return <input {...elementProps} ref={elementRef} />;
  },
);
