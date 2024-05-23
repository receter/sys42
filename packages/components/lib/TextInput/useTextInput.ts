import { concatClassNames as cn } from "@sys42/utils";

import {
  BaseTextInputProps,
  useBaseTextInput,
  UseTextInputOptions,
} from "./useBaseTextInput";

import styles from "./styles.module.css";

export type TextInputProps = BaseTextInputProps;

export function useTextInput(options: UseTextInputOptions<TextInputProps>) {
  const textInput = useBaseTextInput(options);

  textInput.textInputProps.className = cn(
    styles.textInput,
    textInput.textInputProps.className,
  );

  return textInput;
}
