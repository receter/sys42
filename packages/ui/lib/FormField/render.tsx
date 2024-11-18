import { Label } from "../Label";

import { FormFieldContext } from "./context";

export function renderFormField(args: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  errorMessagesProps: React.HTMLAttributes<HTMLElement>[];
  children: React.ReactNode | ((ctx: FormFieldContext) => React.ReactNode);
  ctx: FormFieldContext;
}) {
  const { labelProps, errorMessagesProps, children, ctx } = args;

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
