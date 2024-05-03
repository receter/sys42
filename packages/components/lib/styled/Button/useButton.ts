import { concatClassNames as cn } from '@sys42/utils';
import { UseButtonArgs, useUnstyledButton } from '../../unstyled/Button/useUnstyledButton'

import styles from './styles.module.css'

export function useButton<T, E extends HTMLElement>(...args: UseButtonArgs<T, E>) {
  const button = useUnstyledButton<T, E>(...args);
  return {
    ...button,
    buttonProps: {
      ...button.buttonProps,
      className: cn(
        styles.button,
        button.buttonProps.className
      )
    }
  }
}