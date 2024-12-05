import { isPropsForElement } from "../helpers";

export type BaseTextInputProps = {
  type?: "text" | "password" | "email" | "tel" | "url";
};

export function useBaseTextInput<TTagName extends HTMLElementTagName>(
  {
    props,
    elementType,
    forwardedRef,
  }: UseComponentOptions<BaseTextInputProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { type = "text", ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  if (isPropsForElement(draft.elementProps, elementType, "input")) {
    draft.elementProps.type = type;
  }

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
