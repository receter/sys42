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

  textInput.elementProps.className = cn(
    textInput.elementProps.className,
    styles.textInput,
  );

  return textInput;
}
