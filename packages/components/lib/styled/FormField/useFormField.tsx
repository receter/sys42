import { UseFormFieldOptions, useUnstyledFormField } from '../../unstyled/FormField/useUnstyledFormField'
import { concatClassNames as cn } from '@sys42/utils';

import styles from './styles.module.css'

export function useFormField<ElemAttr, Elem extends HTMLElement>(options: UseFormFieldOptions<ElemAttr, Elem>):
  ReturnType<typeof useUnstyledFormField<ElemAttr, Elem>> {
  const formField = useUnstyledFormField(options);
  return {
    ...formField,
    wrapperProps: {
      ...formField.wrapperProps,
      className: cn(
        formField.wrapperProps.className,
        styles.formField
      ),
    },
    errorMessagesProps: formField.errorMessagesProps.map((props) => ({
      ...props,
      className: cn(
        props.className,
        styles.errorMessage
      ),
    })),
    labelProps: {
      ...formField.labelProps,
      className: cn(
        formField.labelProps.className,
        styles.label
      ),
    },
  }
}