import React, { HTMLAttributes, useState } from "react";
import { isArray, uniqueId } from "lodash-es";

import { FormFieldContextType } from "./context";

export type BaseFormFieldProps<ElemProps> = Sys42Props<
  {
    errorMessage?: string | string[];
    label: React.ReactNode;
    htmlFor?: string;
    children:
      | React.ReactNode
      | ((ctx: FormFieldContextType) => React.ReactNode);
  },
  ElemProps
>;

export type UseBaseFormFieldOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export function useBaseFormField<
  Props extends BaseFormFieldProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>({ props, forwardedRef }: UseBaseFormFieldOptions<Props, Elem>) {
  const [uniqueFormFieldId] = useState(() => uniqueId("sys42-form-field-"));

  const { errorMessage, label, htmlFor, children, ...passedOnProps } = props;

  let errorMessageArray: string[] = [];
  if (isArray(errorMessage)) {
    errorMessageArray = errorMessage;
  } else if (errorMessage) {
    errorMessageArray = [errorMessage];
  }

  const ctx: FormFieldContextType = {
    htmlFor: htmlFor || uniqueFormFieldId,
    isError: errorMessageArray.length > 0,
  };

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {
    htmlFor: ctx.htmlFor,
    children: label,
  };

  const errorMessagesProps: React.HTMLAttributes<HTMLElement>[] =
    errorMessageArray.map((errorMessage, i) => ({
      key: i,
      children: errorMessage,
    }));

  const elementProps: React.HTMLAttributes<HTMLElement> = {
    ...passedOnProps,
  };

  return {
    elementProps,
    elementRef: forwardedRef,
    renderArgs: {
      labelProps,
      errorMessagesProps,
      ctx,
      children,
    },
  };
}
