import { Label } from "../Label";

import { FormFieldContext } from "./context";
import { BaseFormFieldRenderArgs } from "./useBaseFormField";

export function renderFormField(args: BaseFormFieldRenderArgs) {
  const { labelProps, errorMessagesProps, children, ctx } = args;

  return (
    <FormFieldContext.Provider value={ctx}>
      <Label {...labelProps} />
      {typeof children === "function" ? children(ctx) : children}
      {errorMessagesProps.map((props, i) => (
        <div {...props} key={i} />
      ))}
    </FormFieldContext.Provider>
  );
}
