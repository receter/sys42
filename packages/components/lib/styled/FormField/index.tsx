import { forwardRef } from "react";

import { Label } from "../Label";
import { FormFieldContext } from "../../unstyled/FormField";

import { useFormField, FormFieldProps } from "./useFormField";

export const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const {
    formFieldProps: wrapperProps,
    formFieldRef: wrapperRef,
    labelProps,
    errorMessagesProps,
    ctx,
  } = useFormField({ props, elementType: "div", forwardedRef });
  return (
    <FormFieldContext.Provider value={ctx}>
      <div {...wrapperProps} ref={wrapperRef}>
        <Label {...labelProps} />
        {wrapperProps.children}
        {errorMessagesProps.map((props) => (
          <div {...props} />
        ))}
      </div>
    </FormFieldContext.Provider>
  );
});
