import { createComponent } from "../helpers";

import { ButtonProps, useButton } from "./useButton";

export const ButtonA = createComponent<ButtonProps, "a">("a", (hookOptions) => {
  const { elementProps, elementRef } = useButton(hookOptions);
  return <a {...elementProps} ref={elementRef} />;
});
