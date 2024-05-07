import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { Sys42Props } from "../../types";

// This are our props that we want to expose as an interface to the TextInput component
export type TextInputProps = {
  type?: "text" | "password" | "email" | "tel" | "url";
};

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export type UseTextInputOptions = {
  props: Sys42Props<InputHTMLAttributes, TextInputProps>;
  forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

export function useUnstyledTextInput({
  props,
  forwardedRef,
}: UseTextInputOptions) {
  const { type = "text", ...passedOnProps } = props;

  const ref = useRef<HTMLInputElement>(null);

  const textInputProps: InputHTMLAttributes = {
    type,
    ...passedOnProps,
  };

  return { textInputProps, textInputRef: mergeRefs([forwardedRef, ref]) };
}
