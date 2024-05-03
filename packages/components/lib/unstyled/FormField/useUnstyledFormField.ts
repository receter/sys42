import React, { useState } from 'react';
import { isArray, uniqueId } from 'lodash-es'
import { FormFieldContext } from '.';

// This are our props that we want to expose as an interface to the Button component
type OurFormFieldProps = {
  errorMessage?: string | string[],
  label: React.ReactNode,
  htmlFor?: string,
  children: React.ReactNode | ((ctx: FormFieldContext) => React.ReactNode),
}

export type Sys42FormFieldProps<T> = Omit<T, keyof OurFormFieldProps> & OurFormFieldProps

export type UseFormFieldArgs<T, WrapperElement extends HTMLElement> = [
  Sys42FormFieldProps<T>,
  keyof JSX.IntrinsicElements,
  React.ForwardedRef<WrapperElement>,
]

export function useUnstyledFormField<T, WrapperElement extends HTMLElement>(
  ...args: UseFormFieldArgs<T, WrapperElement>
) {

  const [props, , forwardedRef] = args;

  const [uniqueFormFieldId] = useState(() => uniqueId('sys42-form-field-'));

  const {
    errorMessage,
    label,
    htmlFor,
    children,
    ...passedOnProps
  } = props;

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
    children: typeof children === 'function' ? children(ctx) : children
  }

  const errorMessagesProps: React.HTMLAttributes<HTMLElement>[] = errorMessageArray.map((errorMessage, i) => ({
    key: i,
    children: errorMessage
  }));

  const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {
    htmlFor: ctx.htmlFor,
    children: label
  }

  return {
    wrapperProps,
    wrapperRef: forwardedRef,
    labelProps,
    errorMessagesProps,
    ctx
  };
}