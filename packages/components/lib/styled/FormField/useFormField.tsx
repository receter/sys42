import { concatClassNames as cn } from "@sys42/utils";

import {
  UseFormFieldOptions,
  useUnstyledFormField,
  UnstyledFormFieldProps,
} from "../../unstyled/FormField/useUnstyledFormField";

import styles from "./styles.module.css";

export type FormFieldProps<ElemProps = void> =
  UnstyledFormFieldProps<ElemProps>;

export function useFormField<
  Props extends FormFieldProps,
  Elem extends HTMLElement,
>(options: UseFormFieldOptions<Props, Elem>) {
  const formField = useUnstyledFormField(options);

  formField.formFieldProps.className = cn(
    formField.formFieldProps.className,
    styles.formField,
  );

  formField.errorMessagesProps.forEach((props) => {
    props.className = cn(props.className, styles.errorMessage);
  });

  formField.labelProps.className = cn(
    formField.labelProps.className,
    styles.label,
  );

  return formField;
}
