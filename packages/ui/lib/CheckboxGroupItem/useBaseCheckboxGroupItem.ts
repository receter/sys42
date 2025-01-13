import { useContext } from "react";

import { CheckboxGroupContext } from "../CheckboxGroup/context";

export type BaseCheckboxGroupItemProps = {
  children: string;
  value: string;
  disabled?: boolean;
};

export function useBaseCheckboxGroupItem<TTagName extends HTMLElementTagName>(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseCheckboxGroupItemProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { children, value, disabled, ...restProps } = props;

  const ctx = useContext(CheckboxGroupContext);

  const draft = {
    elementProps: {
      ...(restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>),
      children,
    },
    checkboxProps: {
      value,
      disabled,
      checked: ctx?.value.includes(value),
      onChange: ctx?.onChangeCheckbox,
    },
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    checkboxProps: draft.checkboxProps,
    elementRef: forwardedRef,
  };
}
