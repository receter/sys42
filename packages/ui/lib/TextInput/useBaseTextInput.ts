import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

// This are our props that we want to expose as an interface to the TextInput component
export type BaseTextInputProps = Sys42Props<
  {
    type?: "text" | "password" | "email" | "tel" | "url";
  },
  React.ComponentProps<"input">
>;

export type UseBaseTextInputOptions<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<HTMLInputElement>;
};

export function useBaseTextInput<Props extends BaseTextInputProps>({
  props,
  forwardedRef,
}: UseBaseTextInputOptions<Props>) {
  const { type = "text", ...passedOnProps } = props;

  const ref = useRef<HTMLInputElement>(null);

  const textInputProps: React.ComponentProps<"input"> = {
    type,
    ...passedOnProps,
  };

  return { textInputProps, textInputRef: mergeRefs([forwardedRef, ref]) };
}
