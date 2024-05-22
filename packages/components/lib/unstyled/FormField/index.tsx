import { createContext, forwardRef } from "react";
import {
  UnstyledFormFieldProps,
  useUnstyledFormField,
} from "./useUnstyledFormField";

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
};

export const FormFieldContext = createContext<FormFieldContext>({
  htmlFor: "",
  isError: false,
});

export const FormField = forwardRef<
  HTMLDivElement,
  UnstyledFormFieldProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { formFieldProps, formFieldRef, labelProps, errorMessagesProps, ctx } =
    useUnstyledFormField({ props, elementType: "div", forwardedRef });
  return (
    <FormFieldContext.Provider value={ctx}>
      <div {...formFieldProps} ref={formFieldRef}>
        <label {...labelProps} />
        {formFieldProps.children}
        {errorMessagesProps.map((props) => (
          <div {...props} />
        ))}
      </div>
    </FormFieldContext.Provider>
  );
});
