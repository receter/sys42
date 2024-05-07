import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { Sys42Props } from "../../types";

// DOCS: The label must be rendered as a label element.

export type LabelProps = {
  // This is here because using {} as a type gives a eslint warning
  children?: React.ReactNode;
};

type LabelHTMLAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;

export type UseLabelOptions = {
  props: Sys42Props<LabelHTMLAttributes, LabelProps>;
  forwardedRef: React.ForwardedRef<HTMLLabelElement>;
};

export function useUnstyledLabel({ props, forwardedRef }: UseLabelOptions) {
  const { ...passedOnProps } = props;

  const ref = useRef<HTMLLabelElement>(null);

  const labelProps: LabelHTMLAttributes = {
    ...passedOnProps,
  };

  return { labelProps, labelRef: mergeRefs([forwardedRef, ref]) };
}
