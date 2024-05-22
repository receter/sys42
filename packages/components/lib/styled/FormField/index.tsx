import { forwardRef } from "react";
import { FormFieldProps } from "../../unstyled/FormField/useUnstyledFormField";
import { Label } from "../Label";

import { useFormField } from "./useFormField";
import { FormFieldContext } from "../../unstyled/FormField";
import { Sys42Props } from "../../types";

export const FormField = forwardRef<
  HTMLDivElement,
  Sys42Props<FormFieldProps, React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { wrapperProps, wrapperRef, labelProps, errorMessagesProps, ctx } =
    useFormField({ props, elementType: "div", forwardedRef });
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
