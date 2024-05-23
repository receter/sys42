import { concatClassNames as cn } from "@sys42/utils";
import { UseStackOptions, BaseStackProps, useBaseStack } from "./useBaseStack";

import styles from "./styles.module.css";

export type StackProps<ElemProps = void> = BaseStackProps<ElemProps>;

export function useStack<Props extends StackProps, Elem extends HTMLElement>(
  options: UseStackOptions<Props, Elem>,
) {
  const stack = useBaseStack(options);

  stack.stackProps.className = cn(styles.stack, stack.stackProps.className);

  return stack;
}
