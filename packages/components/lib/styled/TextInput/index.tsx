import { forwardRef } from "react";
import { useTextInput } from "./useTextInput";
import { Sys42Props } from "../../types";
import { TextInputProps } from "../../unstyled/TextInput/useUnstyledTextInput";

type HTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Sys42Props<HTMLAttributes, TextInputProps>>((props, forwardedRef) => {
  const { textInputProps, textInputRef } = useTextInput({ props, forwardedRef });
  return <input {...textInputProps} ref={textInputRef} />;
});