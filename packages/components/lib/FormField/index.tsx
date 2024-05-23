import { forwardRef } from "react";

import { Label } from "../Label";
import { FormFieldContext } from "./context";

import { useFormField, FormFieldProps } from "./useFormField";

export const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { formFieldProps, formFieldRef, labelProps, errorMessagesProps, ctx } =
    useFormField({ props, elementType: "div", forwardedRef });
  return (
    <FormFieldContext.Provider value={ctx}>
      <div {...formFieldProps} ref={formFieldRef}>
        <Label {...labelProps} />
        {formFieldProps.children}
        {errorMessagesProps.map((props) => (
          <div {...props} />
        ))}
      </div>
    </FormFieldContext.Provider>
  );
});
