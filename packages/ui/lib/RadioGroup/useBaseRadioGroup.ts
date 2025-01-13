import { RadioGroupContextType } from "./context";

export type BaseRadioGroupProps = {
  value: string;
  onChangeValue: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  role?: "radiogroup";
};

export type BaseRadioGroupRenderArgs = {
  ctx: RadioGroupContextType;
  children: React.ReactNode;
};

export function useBaseRadioGroup<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseRadioGroupProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { value, onChangeValue, onChange, children, role, ...restProps } =
    props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  draft.elementProps.role = role ?? "radiogroup";

  function handleChangeRadio(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.checked && e.target.value !== value) {
      onChangeValue(e.target.value);
    }
  }

  const ctx: RadioGroupContextType = {
    value,
    onChangeRadio: handleChangeRadio,
  };

  interceptor?.(draft);

  const renderArgs: BaseRadioGroupRenderArgs = {
    ctx,
    children,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs,
  };
}
