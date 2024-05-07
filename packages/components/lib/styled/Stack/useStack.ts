import { concatClassNames as cn } from "@sys42/utils";
import {
  UseStackOptions,
  useUnstyledStack,
} from "../../unstyled/Stack/useUnstyledStack";

import styles from "./styles.module.css";

export function useStack<ElemAttr, Elem extends HTMLElement>(
  options: UseStackOptions<ElemAttr, Elem>,
): ReturnType<typeof useUnstyledStack<ElemAttr, Elem>> {
  const stack = useUnstyledStack(options);
  return {
    ...stack,
    stackProps: {
      ...stack.stackProps,
      className: cn(styles.stack, stack.stackProps.className),
    },
  };
}
