import { cn } from "@sys42/utils";

import { BaseTextInputProps, useBaseTextInput } from "./useBaseTextInput";

import styles from "./styles.module.css";

export type TextInputProps = BaseTextInputProps;

export function useTextInput<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<TextInputProps, TTagName>,
) {
  return useBaseTextInput(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.textInput,
    );
  });
}
