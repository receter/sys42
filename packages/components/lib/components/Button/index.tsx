import { Button as UnstyledButton, ButtonProps } from '../../unstyled/Button'

import styles from './styles.module.css'

const buttonStyles = {
  button: styles.button,
}

export function Button(props: ButtonProps) {
  return <UnstyledButton
    {...props}
    styles={buttonStyles}
  />;
}
