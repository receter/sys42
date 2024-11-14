import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseFormFieldProps,
  useBaseFormField,
  UseBaseFormFieldOptions,
} from "./useBaseFormField";

import styles from "./styles.module.css";

export type FormFieldProps<ElemProps> = BaseFormFieldProps<ElemProps>;

export function useFormField<
  Props extends FormFieldProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseFormFieldOptions<Props, Elem>) {
  const formField = useBaseFormField(options);

  formField.formFieldProps.className = cn(
    formField.formFieldProps.className,
    styles.formField,
  );

  formField.markupProps.errorMessagesProps.forEach((props) => {
    props.className = cn(props.className, styles.errorMessage);
  });

  formField.markupProps.labelProps.className = cn(
    formField.markupProps.labelProps.className,
    styles.label,
  );

  return formField;
}
