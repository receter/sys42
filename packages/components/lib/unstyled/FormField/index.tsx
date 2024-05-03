import { createContext, forwardRef } from "react";
import { Sys42FormFieldProps, useUnstyledFormField } from "./useUnstyledFormField";

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
}

export const FormFieldContext = createContext<FormFieldContext>({ htmlFor: '', isError: false });

type HTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export const FormField = forwardRef<HTMLDivElement, Sys42FormFieldProps<HTMLAttributes>>((props, forwardedRef) => {
  const {
    wrapperProps,
    wrapperRef,
    labelProps,
    errorMessagesProps,
    ctx
  } = useUnstyledFormField<HTMLAttributes, HTMLDivElement>(props, "div", forwardedRef);
  return <FormFieldContext.Provider value={ctx}>
    <div {...wrapperProps} ref={wrapperRef}>
      <label {...labelProps} />
      {wrapperProps.children}
      {errorMessagesProps.map((props) => <div {...props} />)}
    </div>
  </FormFieldContext.Provider>
});