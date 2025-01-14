import React from "react";
import { isArray } from "lodash-es";

import { FormFieldSetContextType } from "./context";

export type BaseFormFieldSetProps = {
  errorMessage?: string | string[];
  label: React.ReactNode;
  children:
    | React.ReactNode
    | ((ctx: FormFieldSetContextType) => React.ReactNode);
};

export type BaseFormFieldSetDraft = {
  elementProps: React.ComponentPropsWithoutRef<"fieldset">;
  legendProps: React.ComponentPropsWithoutRef<"legend">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
};

export type BaseFormFieldSetRenderArgs = {
  legendProps: React.ComponentPropsWithoutRef<"legend">;
  errorMessagesProps: React.ComponentPropsWithoutRef<"div">[];
  ctx: FormFieldSetContextType;
  children:
    | React.ReactNode
    | ((ctx: FormFieldSetContextType) => React.ReactNode);
};

export function useBaseFormFieldSet(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseFormFieldSetProps, "fieldset">,
  interceptor?: UseComponentInterceptor<
    "fieldset",
    BaseFormFieldSetDraft,
    FormFieldSetContextType
  >,
) {
  const { errorMessage, label, children, ...restProps } = props;

  let errorMessageArray: string[] = [];
  if (isArray(errorMessage)) {
    errorMessageArray = errorMessage;
  } else if (errorMessage) {
    errorMessageArray = [errorMessage];
  }

  const ctx: FormFieldSetContextType = {
    isError: errorMessageArray.length > 0,
  };

  const draft: BaseFormFieldSetDraft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"fieldset">,
    legendProps: {
      children: label,
    },
    errorMessagesProps: errorMessageArray.map((errorMessage) => ({
      children: errorMessage,
    })),
  };

  interceptor?.(draft, ctx);

  const renderArgs: BaseFormFieldSetRenderArgs = {
    legendProps: draft.legendProps,
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
