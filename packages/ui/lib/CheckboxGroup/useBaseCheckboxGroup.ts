import { CheckboxGroupContextType } from "./context";

export type BaseCheckboxGroupProps = {
  value: string[];
  onValueChange?: (
    value: string[],
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const { value, onValueChange, onChange, children, role, name, ...restProps } =
    props;

  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
  };

  draft.elementProps.role = role ?? "group";

  function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    if (e.target.checked && !value.includes(e.target.value)) {
      onValueChange?.([...value, e.target.value], e);
    } else if (!e.target.checked && value.includes(e.target.value)) {
      onValueChange?.(
        value.filter((v) => v !== e.target.value),
        e,
      );
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
