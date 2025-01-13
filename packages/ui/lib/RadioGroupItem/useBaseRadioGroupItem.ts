import { useContext } from "react";

import { RadioGroupContext } from "../RadioGroup/context";

export type BaseRadioGroupItemProps = {
  children: string;
  value: string;
  disabled?: boolean;
};

export function useBaseRadioGroupItem<TTagName extends HTMLElementTagName>(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseRadioGroupItemProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { children, value, disabled, ...restProps } = props;

  const ctx = useContext(RadioGroupContext);

  const draft = {
    elementProps: {
      ...(restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>),
      children,
    },
    radioProps: {
      value,
      disabled,
      checked: ctx?.value === value,
      onChange: ctx?.onChangeRadio,
    },
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    radioProps: draft.radioProps,
    elementRef: forwardedRef,
  };
}
