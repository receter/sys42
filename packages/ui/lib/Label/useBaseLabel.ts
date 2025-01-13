export interface BaseLabelProps {}

export function useBaseLabel<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseLabelProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
