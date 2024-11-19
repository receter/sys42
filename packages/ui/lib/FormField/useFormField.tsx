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

  formField.elementProps.className = cn(
    formField.elementProps.className,
    styles.formField,
  );

  formField.renderArgs.errorMessagesProps.forEach((props) => {
    props.className = cn(props.className, styles.errorMessage);
  });

  formField.renderArgs.labelProps.className = cn(
    formField.renderArgs.labelProps.className,
    styles.label,
  );

  return formField;
}
