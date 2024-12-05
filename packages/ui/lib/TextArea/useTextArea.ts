import { cn } from "@sys42/utils";

import { BaseTextAreaProps, useBaseTextArea } from "./useBaseTextArea";

import styles from "./styles.module.css";

export type TextAreaProps = BaseTextAreaProps;

export function useTextArea(
  options: UseComponentOptions<TextAreaProps, "textarea">,
) {
  return useBaseTextArea(options, (draft) => {
    draft.elementProps.className = cn(
      styles.textArea,
      draft.elementProps.className,
    );
  });
}
