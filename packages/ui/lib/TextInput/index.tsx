import { forwardRef } from "react";

import { TextInputProps, useTextInput } from "./useTextInput";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, forwardedRef) => {
    const { elementProps, elementRef } = useTextInput({
      props,
      forwardedRef,
    });
    return <input {...elementProps} ref={elementRef} />;
  },
);
