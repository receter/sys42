import { HTMLAttributes } from "react";

import { RadioGroupContextValue } from "./context";

export type BaseRadioGroupProps<ElemProps> = Sys42Props<
  {
    value: string;
    // TODO: Change to native onChange type.
    // Confirm also if we will add onChangeValue.
    onChange: (value: string) => void;
    children: React.ReactNode;
  },
  ElemProps
>;

export type UseBaseRadioGroupProps<Props, Elem extends HTMLElement> = {
  props: Props;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseRadioGroup<
  Props extends BaseRadioGroupProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseRadioGroupProps<Props, Elem>) {
  const { value, onChange, ...elementProps } = props;

  return {
    ctx: {
      value: value,
      onChange,
    } as RadioGroupContextValue,
    elementProps,
    elementRef: forwardedRef,
  };
}
