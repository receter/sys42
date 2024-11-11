import { forwardRef } from "react";

import { TextAreaProps, useTextArea } from "./useTextArea";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { textAreaProps, textAreaRef } = useTextArea({
      props,
      forwardedRef: ref,
    });

    return <textarea ref={textAreaRef} {...textAreaProps} />;
  },
);
