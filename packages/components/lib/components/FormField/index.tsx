import { FormField as UnstyledFormField, FormFieldProps } from '../../unstyled/FormField'
import { Label } from '../Label';

import styles from './styles.module.css'

const formFieldStyles = {
  formField: styles.formField,
  errorMessage: styles.errorMessage,
  label: styles.label,
}

export function FormField(props: FormFieldProps) {
  return <UnstyledFormField
    {...props}
    styles={formFieldStyles}
    components={{ Label }}
  />;
}