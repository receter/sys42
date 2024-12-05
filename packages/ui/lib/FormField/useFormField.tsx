import { cn } from "@sys42/utils";

import { BaseFormFieldProps, useBaseFormField } from "./useBaseFormField";

import styles from "./styles.module.css";

export type FormFieldProps = BaseFormFieldProps;

export function useFormField<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<FormFieldProps, TTagName>,
) {
  return useBaseFormField(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.formField,
    );

    draft.errorMessagesProps.forEach((props) => {
      props.className = cn(props.className, styles.errorMessage);
    });

    draft.labelProps.className = cn(draft.labelProps.className, styles.label);
  });
}
