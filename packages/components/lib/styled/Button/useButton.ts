import { concatClassNames as cn } from '@sys42/utils';
import { UseButtonOptions, useUnstyledButton } from '../../unstyled/Button/useUnstyledButton'

import styles from './styles.module.css'

export function useButton<ElemAttr, Elem extends HTMLElement>(options: UseButtonOptions<ElemAttr, Elem>) {
  const button = useUnstyledButton(options);
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