import { CheckboxGroupContextType } from "./context";

export type BaseCheckboxGroupProps = {
  value: string[];
  onChangeValue: (value: string[]) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  role?: "group";
  name?: string;
};

export type BaseCheckboxGroupRenderArgs = {
  ctx: CheckboxGroupContextType;
  children: React.ReactNode;
};

export function useBaseCheckboxGroup<TTagName extends HTMLElementTagName>(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseCheckboxGroupProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName>,
) {
  const { value, onChangeValue, onChange, children, role, name, ...restProps } =
    props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  draft.elementProps.role = role ?? "group";

  function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.checked && !value.includes(e.target.value)) {
      onChangeValue([...value, e.target.value]);
    } else if (!e.target.checked && value.includes(e.target.value)) {
      onChangeValue(value.filter((v) => v !== e.target.value));
    }
  }

  const ctx: CheckboxGroupContextType = {
    value,
    name,
    onChangeCheckbox: handleChangeCheckbox,
  };

  interceptor?.(draft);

  const renderArgs: BaseCheckboxGroupRenderArgs = {
    ctx,
    children,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs,
  };
}
