import { concatClassNames as cn } from "@sys42/utils";
import {
  UseTextInputOptions,
  UnstyledTextInputProps,
  useUnstyledTextInput,
} from "./useUnstyledTextInput";

import styles from "./styles.module.css";

export type TextInputProps = UnstyledTextInputProps;

export function useTextInput(options: UseTextInputOptions<TextInputProps>) {
  const textInput = useUnstyledTextInput(options);

  textInput.textInputProps.className = cn(
    styles.textInput,
    textInput.textInputProps.className,
  );

  return textInput;
}
