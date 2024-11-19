import { HTMLAttributes } from "react";

import { RadioGroupContext } from "./context";

export type BaseRadioGroupProps<ElemProps> = Sys42Props<
  {
    value: string;
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
  const { value, onChange, children, ...passedOnProps } = props;

  return {
    ctx: {
      value: value,
      onChange,
    } as RadioGroupContext,
    radioGroupProps: {
      ...passedOnProps,
      ref: forwardedRef,
      children,
    },
  };
}
