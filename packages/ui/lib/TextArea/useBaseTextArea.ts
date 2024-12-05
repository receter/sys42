export interface BaseTextAreaProps {}

export function useBaseTextArea(
  { props, forwardedRef }: UseComponentOptions<BaseTextAreaProps, "textarea">,
  interceptor?: UseComponentInterceptor<"textarea">,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"textarea">,
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
