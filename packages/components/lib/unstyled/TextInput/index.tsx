import { forwardRef } from "react";
import { TextInputProps, useUnstyledTextInput } from "./useUnstyledTextInput";
import { Sys42Props } from "../../types";

type HTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<
  HTMLInputElement,
  Sys42Props<HTMLAttributes, TextInputProps>
>((props, forwardedRef) => {
  const { textInputProps, textInputRef } = useUnstyledTextInput({
    props,
    forwardedRef,
  });
  return <input {...textInputProps} ref={textInputRef} />;
});
