import { forwardRef } from "react";
import { useTextInput } from "./useTextInput";
import { Sys42Props } from "../../types";
import { TextInputProps } from "../../unstyled/TextInput/useUnstyledTextInput";

export const TextInput = forwardRef<
  HTMLInputElement,
  Sys42Props<TextInputProps, React.ComponentProps<"input">>
>((props, forwardedRef) => {
  const { textInputProps, textInputRef } = useTextInput({
    props,
    forwardedRef,
  });
  return <input {...textInputProps} ref={textInputRef} />;
});
