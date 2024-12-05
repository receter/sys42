// DOCS: The label must be rendered as a label element.

export interface BaseLabelProps {}

export function useBaseLabel<TagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseLabelProps, TagName>,
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
