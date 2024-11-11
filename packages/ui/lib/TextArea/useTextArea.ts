import { cn } from "@sys42/utils";

import {
  BaseTextAreaProps,
  useBaseTextArea,
  UseBaseTextAreaOptions,
} from "./useBaseTextArea";

import styles from "./styles.module.css";

export type TextAreaProps = BaseTextAreaProps;

export function useTextArea(options: UseBaseTextAreaOptions<TextAreaProps>) {
  const textArea = useBaseTextArea(options);

  textArea.textAreaProps.className = cn(
    styles.textArea,
    textArea.textAreaProps.className,
  );

  return textArea;
}
