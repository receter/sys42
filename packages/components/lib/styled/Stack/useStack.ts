import { concatClassNames as cn } from "@sys42/utils";
import {
  UseStackOptions,
  UnstyledStackProps,
  useUnstyledStack,
} from "../../unstyled/Stack/useUnstyledStack";

import styles from "./styles.module.css";

export type StackProps<ElemProps = void> = UnstyledStackProps<ElemProps>;

export function useStack<Props extends StackProps, Elem extends HTMLElement>(
  options: UseStackOptions<Props, Elem>,
) {
  const stack = useUnstyledStack(options);

  stack.stackProps.className = cn(styles.stack, stack.stackProps.className);

  return stack;
}
