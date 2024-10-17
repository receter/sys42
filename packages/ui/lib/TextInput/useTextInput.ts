import { cn } from "@sys42/utils";

import {
  BaseTextInputProps,
  useBaseTextInput,
  UseBaseTextInputOptions,
} from "./useBaseTextInput";

import styles from "./styles.module.css";

export type TextInputProps = BaseTextInputProps;

export function useTextInput(options: UseBaseTextInputOptions<TextInputProps>) {
  const textInput = useBaseTextInput(options);

  textInput.textInputProps.className = cn(
    styles.textInput,
    textInput.textInputProps.className,
  );

  return textInput;
}
