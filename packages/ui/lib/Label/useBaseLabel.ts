import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

// DOCS: The label must be rendered as a label element.

export type BaseLabelProps = Sys42Props<
  {
    // This is here because using {} would mean "any non-nullish value"
    children?: React.ReactNode;
  },
  React.ComponentProps<"label">
>;

export type UseBaseLabelOptions<Props> = {
  props: Sys42Props<Props, React.ComponentProps<"label">>;
  forwardedRef: React.ForwardedRef<HTMLLabelElement>;
};

export function useBaseLabel<Props extends BaseLabelProps>({
  props,
  forwardedRef,
}: UseBaseLabelOptions<Props>) {
  const { ...passedOnProps } = props;

  const ref = useRef<HTMLLabelElement>(null);

  const labelProps: React.ComponentProps<"label"> = {
    ...passedOnProps,
  };

  return { labelProps, labelRef: mergeRefs([forwardedRef, ref]) };
}
