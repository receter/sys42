import { forwardRef } from "react";
import { Sys42FormFieldProps } from "../../unstyled/FormField/useUnstyledFormField";
import { Label } from "../Label";

import { useFormField } from "./useFormField";
import { FormFieldContext } from "../../unstyled/FormField";

type HTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export const FormField = forwardRef<HTMLDivElement, Sys42FormFieldProps<HTMLAttributes>>((props, forwardedRef) => {
  const {
    wrapperProps,
    wrapperRef,
    labelProps,
    errorMessagesProps,
    ctx
  } = useFormField<HTMLAttributes, HTMLDivElement>(props, "div", forwardedRef);
  return <FormFieldContext.Provider value={ctx}>
    <div {...wrapperProps} ref={wrapperRef}>
      <Label {...labelProps} />
      {wrapperProps.children}
      {errorMessagesProps.map((props) => <li {...props} />)}
    </div>
  </FormFieldContext.Provider>
});
