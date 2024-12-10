import { createComponent } from "../helpers";

import { TextAreaProps, useTextArea } from "./useTextArea";

export const TextArea = createComponent<TextAreaProps, "textarea">(
  "textarea",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextArea(hookOptions);
    return <textarea {...elementProps} ref={elementRef} />;
  },
);
