export interface BaseCheckboxProps {}

export function useBaseCheckbox(
  { props, forwardedRef }: UseComponentOptions<BaseCheckboxProps, "input">,
  interceptor?: UseComponentInterceptor<"input">,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"input">,
  };

  draft.elementProps.type = "checkbox";

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
