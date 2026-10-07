import { RadioGroupContextType } from "./context";

export type BaseRadioGroupProps = {
  value: string;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  role?: "radiogroup";
  name?: string;
};

export type BaseRadioGroupRenderArgs = {
  ctx: RadioGroupContextType;
  children: React.ReactNode;
};

export function useBaseRadioGroup<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseRadioGroupProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { value, onValueChange, onChange, children, role, name, ...restProps } =
    props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  draft.elementProps.role = role ?? "radiogroup";

  function handleChangeRadio(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.checked && e.target.value !== value) {
      onValueChange?.(e.target.value, e);
    }
  }

  const ctx: RadioGroupContextType = {
    value,
    name,
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
