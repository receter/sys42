import { forwardRef } from "react";

import { TextAreaProps, useTextArea } from "./useTextArea";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { elementProps, elementRef } = useTextArea({
      props,
      forwardedRef: ref,
    });

    return <textarea ref={elementRef} {...elementProps} />;
  },
);
