import React, { useState } from "react";
import { isArray, uniqueId } from "lodash-es";

import { FormFieldContextType } from "./context";

export type BaseFormFieldProps = {
  errorMessage?: string | string[];
  label: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode | ((ctx: FormFieldContextType) => React.ReactNode);
};

export type BaseFormFieldDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  labelProps: React.ComponentPropsWithoutRef<"label">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
};

export type BaseFormFieldRenderArgs = {
  labelProps: React.ComponentPropsWithoutRef<"label">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
  ctx: FormFieldContextType;
  children: React.ReactNode | ((ctx: FormFieldContextType) => React.ReactNode);
};

export function useBaseFormField<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseFormFieldProps, TTagName>,
  interceptor?: UseComponentInterceptor<
    TTagName,
    BaseFormFieldDraft<TTagName>,
    FormFieldContextType
  >,
) {
  const [uniqueFormFieldId] = useState(() => uniqueId("sys42-form-field-"));

  const { errorMessage, label, htmlFor, children, ...restProps } = props;

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

  const draft: BaseFormFieldDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    labelProps: {
      htmlFor: ctx.htmlFor,
      children: label,
    },
    errorMessagesProps: errorMessageArray.map((errorMessage) => ({
      children: errorMessage,
    })),
  };

  interceptor?.(draft, ctx);

  const renderArgs: BaseFormFieldRenderArgs = {
    labelProps: draft.labelProps,
    errorMessagesProps: draft.errorMessagesProps,
    ctx,
    children,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs,
  };
}
