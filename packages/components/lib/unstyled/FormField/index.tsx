import { createContext, forwardRef } from "react";
import { FormFieldProps, useUnstyledFormField } from "./useUnstyledFormField";
import { Sys42Props } from "../../types";

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
};

export const FormFieldContext = createContext<FormFieldContext>({
  htmlFor: "",
  isError: false,
});

type HTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export const FormField = forwardRef<
  HTMLDivElement,
  Sys42Props<HTMLAttributes, FormFieldProps>
>((props, forwardedRef) => {
  const { wrapperProps, wrapperRef, labelProps, errorMessagesProps, ctx } =
    useUnstyledFormField({ props, elementType: "div", forwardedRef });
  return (
    <FormFieldContext.Provider value={ctx}>
      <div {...wrapperProps} ref={wrapperRef}>
        <label {...labelProps} />
        {wrapperProps.children}
        {errorMessagesProps.map((props) => (
          <div {...props} />
        ))}
      </div>
    </FormFieldContext.Provider>
  );
});
