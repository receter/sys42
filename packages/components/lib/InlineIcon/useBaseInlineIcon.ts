import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { Sys42Props } from "../types";

export type BaseInlineIconProps = Sys42Props<
  {
    Icon: React.ElementType;
  },
  React.AllHTMLAttributes<HTMLElement> & React.SVGAttributes<SVGElement>
>;

export type UseInlineIconOptions<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<HTMLElement | SVGElement>;
};

export function useBaseInlineIcon<Props extends BaseInlineIconProps>({
  props,
  forwardedRef,
}: UseInlineIconOptions<Props>) {
  const { Icon, ...passedOnProps } = props;

  const ref = useRef(null);

  const inlineIconProps: React.AllHTMLAttributes<HTMLElement> = {
    ...passedOnProps,
  };

  return {
    inlineIconProps,
    inlineIconRef: mergeRefs([forwardedRef, ref]),
    IconComponent: Icon,
  };
}
