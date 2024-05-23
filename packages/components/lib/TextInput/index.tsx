import { forwardRef } from "react";
import { useTextInput, TextInputProps } from "./useTextInput";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, forwardedRef) => {
    const { textInputProps, textInputRef } = useTextInput({
      props,
      forwardedRef,
    });
    return <input {...textInputProps} ref={textInputRef} />;
  },
);
