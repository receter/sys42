// Define specific props for the component
// If no props are needed, a interface with an empty object can be used
export interface BaseRadioProps {}

export function useBaseRadio(
  { props, forwardedRef }: UseComponentOptions<BaseRadioProps, "input">,
  interceptor?: UseComponentInterceptor<"input">,
) {
  const { ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"input">,
  };

  draft.elementProps.type = "radio";

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
