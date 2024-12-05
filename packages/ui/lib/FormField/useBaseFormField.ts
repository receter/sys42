import React, { useState } from "react";
import { isArray, uniqueId } from "lodash-es";

import { FormFieldContextType } from "./context";

export type BaseFormFieldProps = {
  errorMessage?: string | string[];
  label: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode | ((ctx: FormFieldContextType) => React.ReactNode);
};

export type UseBaseFormFieldOptions<Props, Elem extends HTMLElement> = {
  props: Props;
  elementType: keyof JSX.IntrinsicElements;
  forwardedRef: React.ForwardedRef<Elem>;
};

export type BaseFormFieldDraft<TagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TagName>;
  labelProps: React.ComponentPropsWithoutRef<"label">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
};

export type BaseFormFieldRenderArgs = {
  labelProps: React.ComponentPropsWithoutRef<"label">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
  ctx: FormFieldContextType;
  children: React.ReactNode | ((ctx: FormFieldContextType) => React.ReactNode);
};

export function useBaseFormField<TagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseFormFieldProps, TagName>,
  interceptor?: UseComponentInterceptor<
    TagName,
    BaseFormFieldDraft<TagName>,
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

  const draft: BaseFormFieldDraft<TagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>,
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
