import { Input as UnstyledInput, InputProps } from '../../unstyled/Input'

import styles from './styles.module.css'

const inputStyles = {
  input: styles.input,
}

export function Input(props: InputProps) {
  return <UnstyledInput
    {...props}
    styles={inputStyles}
  />;
}