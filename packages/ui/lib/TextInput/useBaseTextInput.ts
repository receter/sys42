import { isPropsForElement } from "../helpers";

export type BaseTextInputProps = {
  type?: "text" | "password" | "email" | "tel" | "url";
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export function useBaseTextInput<TTagName extends HTMLElementTagName>(
  {
    props,
    elementType,
    forwardedRef,
  }: UseComponentOptions<BaseTextInputProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { type = "text", onValueChange, ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  if (isPropsForElement(draft.elementProps, elementType, "input")) {
    draft.elementProps.type = type;

    const { onChange } = draft.elementProps;
    draft.elementProps.onChange = function handleChange(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      onChange?.(event);
      onValueChange?.(event.target.value, event);
    };
  }

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
