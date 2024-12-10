import { RadioGroupContext, RadioGroupContextValue } from "./context";

export function renderRadioItem({
  labelProps,
  inputProps,
  children,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
  children: React.ReactNode;
}) {
  return (
    <label {...labelProps}>
      <input {...inputProps} />
      {children}
    </label>
  );
}

export function renderRadioGroup({
  ctx,
  elementProps,
  elementRef,
}: {
  ctx: RadioGroupContextValue;
  elementProps: React.HTMLAttributes<HTMLDivElement>;
  elementRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div {...elementProps} ref={elementRef} />
    </RadioGroupContext.Provider>
  );
}
