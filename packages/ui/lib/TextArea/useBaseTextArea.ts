import React from "react";

// Define specific props for the component
interface TextAreaProps {}

export type BaseTextAreaProps = Sys42Props<
  TextAreaProps,
  React.ComponentProps<"textarea">
>;

export type UseBaseTextAreaOptions<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>;
};

export function useBaseTextArea<Props extends BaseTextAreaProps>({
  props,
  forwardedRef,
}: UseBaseTextAreaOptions<Props>) {
  const textAreaProps: React.ComponentProps<"textarea"> = {
    ...props,
  };

  return {
    textAreaProps,
    textAreaRef: forwardedRef,
  };
}
