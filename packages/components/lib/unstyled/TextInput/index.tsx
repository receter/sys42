import { forwardRef } from "react";
import {
  UnstyledTextInputProps,
  useUnstyledTextInput,
} from "./useUnstyledTextInput";

export const TextInput = forwardRef<HTMLInputElement, UnstyledTextInputProps>(
  (props, forwardedRef) => {
    const { textInputProps, textInputRef } = useUnstyledTextInput({
      props,
      forwardedRef,
    });
    return <input {...textInputProps} ref={textInputRef} />;
  },
);
