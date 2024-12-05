import { isPropsForElement } from "../helpers";

export type BaseTextInputProps = {
  type?: "text" | "password" | "email" | "tel" | "url";
};

export function useBaseTextInput<TagName extends HTMLElementTagName>(
  {
    props,
    elementType,
    forwardedRef,
  }: UseComponentOptions<BaseTextInputProps, TagName>,
  interceptor?: UseComponentInterceptor<TagName>,
) {
  const { type = "text", ...restProps } = props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>,
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
