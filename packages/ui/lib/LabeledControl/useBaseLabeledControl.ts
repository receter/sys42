// Define specific props for the component

import React from "react";

// If no props are needed, a interface with an empty object can be used
export type BaseLabeledControlProps = {
  control: React.ReactNode;
  children: string;
};

export type BaseLabeledControlRenderArgs = {
  control: React.ReactNode;
  label: string;
};

export function useBaseLabeledControl(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseLabeledControlProps, "label">,
  interceptor?: UseComponentInterceptor<"label">,
) {
  const { children, control, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"label">,
  };

  interceptor?.(draft);

  const renderArgs: BaseLabeledControlRenderArgs = {
    control,
    label: children,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs,
  };
}
