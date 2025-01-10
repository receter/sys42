import { FormFieldSetContext } from "./context";
import { Legend } from "./Legend";
import { BaseFormFieldSetRenderArgs } from "./useBaseFormFieldSet";

export function renderFormFieldSet(args: BaseFormFieldSetRenderArgs) {
  const { legendProps, errorMessagesProps, children, ctx } = args;

  return (
    <FormFieldSetContext.Provider value={ctx}>
      <Legend {...legendProps} />
      {typeof children === "function" ? children(ctx) : children}
      {errorMessagesProps.map((props, i) => (
        <div {...props} key={i} />
      ))}
    </FormFieldSetContext.Provider>
  );
}
