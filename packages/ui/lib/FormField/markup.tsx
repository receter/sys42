import { Label } from "../Label";

import { FormFieldContext } from "./context";

type FormFieldMarkupProps = {
  ctx: FormFieldContext;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  errorMessagesProps: React.HTMLAttributes<HTMLDivElement>[];
  children: React.ReactNode | ((ctx: FormFieldContext) => React.ReactNode);
};

export function FormFieldMarkup({
  ctx,
  labelProps,
  errorMessagesProps,
  children,
}: FormFieldMarkupProps) {
  return (
    <FormFieldContext.Provider value={ctx}>
      <Label {...labelProps} />
      {typeof children === "function" ? children(ctx) : children}
      {errorMessagesProps.map((props) => (
        <div {...props} />
      ))}
    </FormFieldContext.Provider>
  );
}
