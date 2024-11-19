export function renderRadio({
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
