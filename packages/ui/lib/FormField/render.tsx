import { Label } from "../Label";

import { FormFieldContext, FormFieldContextType } from "./context";

export function renderFormField(args: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  errorMessagesProps: React.HTMLAttributes<HTMLElement>[];
  children: React.ReactNode | ((ctx: FormFieldContextType) => React.ReactNode);
  ctx: FormFieldContextType;
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
