import { cn } from "@sys42/utils";

import { BaseTextInputProps, useBaseTextInput } from "./useBaseTextInput";

import styles from "./styles.module.css";

export type TextInputProps = BaseTextInputProps;

export function useTextInput<TagName extends HTMLElementTagName>(
  options: UseComponentOptions<TextInputProps, TagName>,
) {
  return useBaseTextInput(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.textInput,
    );
  });
}
