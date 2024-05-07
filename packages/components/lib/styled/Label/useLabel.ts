import { concatClassNames as cn } from '@sys42/utils';
import { UseLabelOptions, useUnstyledLabel } from '../../unstyled/Label/useUnstyledLabel'

import styles from './styles.module.css'

export function useLabel(options: UseLabelOptions):
  ReturnType<typeof useUnstyledLabel> {
  const label = useUnstyledLabel(options);
  return {
    ...label,
    labelProps: {
      ...label.labelProps,
      className: cn(
        styles.label,
        label.labelProps.className
      )
    }
  }
}