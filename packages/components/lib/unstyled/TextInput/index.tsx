import { forwardRef } from "react";
import { TextInputProps, useUnstyledTextInput } from "./useUnstyledTextInput";
import { Sys42Props } from "../../types";

export const TextInput = forwardRef<
  HTMLInputElement,
  Sys42Props<TextInputProps, React.ComponentProps<"input">>
>((props, forwardedRef) => {
  const { textInputProps, textInputRef } = useUnstyledTextInput({
    props,
    forwardedRef,
  });
  return <input {...textInputProps} ref={textInputRef} />;
});
