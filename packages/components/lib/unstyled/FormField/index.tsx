import { concatClassNames as cn } from '@sys42/utils'
import { isArray, uniqueId } from 'lodash-es'
import { Sys42ComponentProps, Sys42UnstyledComponentProps } from '../../types';
import React, { createContext, useState } from 'react';
import { LabelProps } from '../Label';

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
}

export type FormFieldProps = Omit<Sys42ComponentProps, 'children'> & {
  errorMessage?: string | string[],
  label: React.ReactNode,
  htmlFor?: string,
  children: React.ReactNode | ((ctx: FormFieldContext) => React.ReactNode),
};

type UnstyledFormFieldProps = Sys42UnstyledComponentProps<FormFieldProps, {
  formField: string,
  errorMessage: string,
  label: string,
}, {
  Label: React.ComponentType<LabelProps>
}>;

export const FormFieldContext = createContext<FormFieldContext>({ htmlFor: '', isError: false });

export function FormField(props: UnstyledFormFieldProps) {

  const { className, styles, components, errorMessage, label, htmlFor, children, ...restProps } = props;

  const { Label } = components;

  const [uniqueFormFieldId] = useState(() => uniqueId('sys42-form-field-'));

  let errorMessageArray: string[] = [];
  if (isArray(errorMessage)) {
    errorMessageArray = errorMessage;
  } else if (errorMessage) {
    errorMessageArray = [errorMessage];
  }

  const ctx = {
    htmlFor: htmlFor || uniqueFormFieldId,
    isError: errorMessageArray.length > 0,
  };

  return <div
    {...restProps}
    className={cn(styles.formField, className)}
  >
    <Label className={styles.label} htmlFor={ctx.htmlFor}>{label}</Label>
    <FormFieldContext.Provider value={ctx}>
      {typeof children === 'function' ? children(ctx) : children}
    </FormFieldContext.Provider>
    {errorMessageArray.map((errorMessage, i) =>
      <div key={i} className={styles.errorMessage}>{errorMessage}</div>
    )}
  </div>;
}