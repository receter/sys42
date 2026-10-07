// See BaseButtonProps for why this is an interface
export interface BaseOptionProps {}

export function useBaseOption(
  { props, forwardedRef }: UseComponentOptions<BaseOptionProps, "option">,
  interceptor?: UseComponentInterceptor<"option">,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"option">,
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
