// DOCS: The label must be rendered as a label element.

export interface BaseLabelProps {}

export function useBaseLabel(
  { props, forwardedRef }: UseComponentOptions<BaseLabelProps, "label">,
  interceptor?: UseComponentInterceptor<"label">,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"label">,
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
