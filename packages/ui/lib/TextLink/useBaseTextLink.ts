export interface BaseTextLinkProps {}

export function useBaseTextLink<TagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseTextLinkProps, TagName>,
  interceptor?: UseComponentInterceptor<TagName>,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>,
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
