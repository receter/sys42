import { createComponent } from "../helpers";

import { SplitButtonItemProps, useSplitButtonItem } from "./useSplitButtonItem";

// DOC: Item for SplitButton
export const SplitButtonItem = createComponent<SplitButtonItemProps, "button">(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useSplitButtonItem(hookOptions);
    return <button {...elementProps} ref={elementRef} />;
  },
);
