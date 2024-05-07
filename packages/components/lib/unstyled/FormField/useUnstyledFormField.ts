import React, { useState } from "react";
import { isArray, uniqueId } from "lodash-es";
import { FormFieldContext } from ".";
import { Sys42Props } from "../../types";

// This are our props that we want to expose as an interface to the Button component
export type FormFieldProps = {
  errorMessage?: string | string[];
  label: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode | ((ctx: FormFieldContext) => React.ReactNode);
};

export type UseFormFieldOptions<ElemAttr, Elem extends HTMLElement> = {
  props: Sys42Props<ElemAttr, FormFieldProps>;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useUnstyledFormField<ElemAttr, Elem extends HTMLElement>({
  props,
  forwardedRef,
}: UseFormFieldOptions<ElemAttr, Elem>) {
  const [uniqueFormFieldId] = useState(() => uniqueId("sys42-form-field-"));

  const { errorMessage, label, htmlFor, children, ...passedOnProps } = props;

  let errorMessageArray: string[] = [];
  if (isArray(errorMessage)) {
    errorMessageArray = errorMessage;
  } else if (errorMessage) {
    errorMessageArray = [errorMessage];
  }

  const ctx: FormFieldContext = {
    htmlFor: htmlFor || uniqueFormFieldId,
    isError: errorMessageArray.length > 0,
  };

  const wrapperProps: React.HTMLAttributes<HTMLElement> = {
    ...passedOnProps,
    children: typeof children === "function" ? children(ctx) : children,
  };

  const errorMessagesProps: React.HTMLAttributes<HTMLElement>[] =
    errorMessageArray.map((errorMessage, i) => ({
      key: i,
      children: errorMessage,
    }));

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {
    htmlFor: ctx.htmlFor,
    children: label,
  };

  return {
    wrapperProps,
    wrapperRef: forwardedRef,
    labelProps,
    errorMessagesProps,
    ctx,
  };
}
