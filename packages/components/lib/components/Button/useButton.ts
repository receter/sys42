import { useUnstyledButton } from '../../unstyled/Button/useUnstyledButton'

import styles from './styles.module.css'

export type UseButtonParameters<T, E extends HTMLElement> = Parameters<typeof useButton<T, E>>;

export function useButton<T, E extends HTMLElement>(...args: Parameters<typeof useUnstyledButton<T, E>>) {
  const button = useUnstyledButton<T, E>(...args);
  return {
    ...button,
    buttonProps: {
      ...button.buttonProps,
      className: styles.button,
    }
  }
}