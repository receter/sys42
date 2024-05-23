import { forwardRef } from "react";

import { TextInputProps,useTextInput } from "./useTextInput";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, forwardedRef) => {
    const { textInputProps, textInputRef } = useTextInput({
      props,
      forwardedRef,
    });
    return <input {...textInputProps} ref={textInputRef} />;
  },
);
