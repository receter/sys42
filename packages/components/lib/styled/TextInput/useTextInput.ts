import { concatClassNames as cn } from '@sys42/utils';
import { UseTextInputOptions, useUnstyledTextInput } from '../../unstyled/TextInput/useUnstyledTextInput'

import styles from './styles.module.css'

export function useTextInput(options: UseTextInputOptions):
  ReturnType<typeof useUnstyledTextInput> {
  const textInput = useUnstyledTextInput(options);
  return {
    ...textInput,
    textInputProps: {
      ...textInput.textInputProps,
      className: cn(
        styles.textInput,
        textInput.textInputProps.className
      )
    }
  }
}