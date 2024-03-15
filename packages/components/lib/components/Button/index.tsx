import { forwardRef } from 'react';
import { ButtonProps, Button as UnstyledButton } from '../../unstyled/Button'

import styles from './styles.module.css'

const buttonStyles = {
  button: styles.button,
}

export const Button = forwardRef((
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return <UnstyledButton
    {...props}
    styles={buttonStyles}
    ref={ref}
  />;
});

/* export const Button = applyCSSModuleClasses(UnstyledButton, buttonStyles);

function applyCSSModuleClasses<C, S>(Component: C, styles: S) {
  return forwardRef((props: Sys42UnstyledComponentProps, ref) => {
    return <Component
      {...props}
      styles={styles}
      ref={ref}
    />;
  });
} */