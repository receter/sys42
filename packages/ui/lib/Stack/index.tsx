import { createComponent } from "../helpers";

import { StackProps, useStack } from "./useStack";

export const Stack = createComponent<StackProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef } = useStack(hookOptions);
    return <div {...elementProps} ref={elementRef} />;
  },
);
