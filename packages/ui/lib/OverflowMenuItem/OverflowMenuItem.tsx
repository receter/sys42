import { createComponent } from "../helpers";

import {
  OverflowMenuItemProps,
  useOverflowMenuItem,
} from "./useOverflowMenuItem";

// DOC: Item for OverflowMenu
export const OverflowMenuItem = createComponent<
  OverflowMenuItemProps,
  "button"
>("button", (hookOptions) => {
  const { elementProps, elementRef } = useOverflowMenuItem(hookOptions);
  return <button {...elementProps} ref={elementRef} />;
});
