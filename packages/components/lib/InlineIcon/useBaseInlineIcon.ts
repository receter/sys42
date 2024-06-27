import React from "react";

import { Sys42Props } from "../types";

export type BaseInlineIconProps = Sys42Props<
  {
    Icon: React.ElementType;
  },
  React.AllHTMLAttributes<HTMLElement> & React.SVGAttributes<SVGElement>
>;

export type UseInlineIconOptions<Props> = {
  props: Props;
};

export function useBaseInlineIcon<Props extends BaseInlineIconProps>({
  props,
}: UseInlineIconOptions<Props>) {
  const { Icon, ...passedOnProps } = props;

  const inlineIconProps: React.AllHTMLAttributes<HTMLElement> = {
    ...passedOnProps,
  };

  return {
    inlineIconProps,
    IconComponent: Icon,
  };
}
