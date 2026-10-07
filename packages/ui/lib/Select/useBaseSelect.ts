// With multiple, onValueChange is called with all selected values
export type BaseSelectProps =
  | {
      multiple?: false;
      onValueChange?: (
        value: string,
        event: React.ChangeEvent<HTMLSelectElement>,
      ) => void;
    }
  | {
      multiple: true;
      onValueChange?: (
        value: string[],
        event: React.ChangeEvent<HTMLSelectElement>,
      ) => void;
    };

export function useBaseSelect(
  { props, forwardedRef }: UseComponentOptions<BaseSelectProps, "select">,
  interceptor?: UseComponentInterceptor<"select">,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { multiple, onValueChange, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"select">,
  };

  draft.elementProps.multiple = multiple;

  const { onChange } = draft.elementProps;
  draft.elementProps.onChange = function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    onChange?.(event);
    // props is used instead of the destructured values to narrow the union
    if (props.multiple) {
      props.onValueChange?.(
        Array.from(event.target.selectedOptions, (option) => option.value),
        event,
      );
    } else {
      props.onValueChange?.(event.target.value, event);
    }
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
