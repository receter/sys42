import { createComponent } from "../helpers";

import { TextInputProps, useTextInput } from "./useTextInput";

export const TextInput = createComponent<TextInputProps, "input">(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextInput(hookOptions);
    return <input {...elementProps} ref={elementRef} />;
  },
);
