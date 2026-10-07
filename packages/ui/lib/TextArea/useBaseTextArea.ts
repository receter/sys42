export type BaseTextAreaProps = {
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

export function useBaseTextArea(
  { props, forwardedRef }: UseComponentOptions<BaseTextAreaProps, "textarea">,
  interceptor?: UseComponentInterceptor<"textarea">,
) {
  const { onValueChange, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"textarea">,
  };

  const { onChange } = draft.elementProps;
  draft.elementProps.onChange = function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    onChange?.(event);
    onValueChange?.(event.target.value, event);
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
