import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseStackProps,
  useBaseStack,
  UseBaseStackOptions,
} from "./useBaseStack";

import styles from "./styles.module.css";

export type StackProps<ElemProps> = BaseStackProps<ElemProps>;

export function useStack<
  Props extends StackProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseStackOptions<Props, Elem>) {
  const stack = useBaseStack(options);

  stack.stackProps.className = cn(styles.stack, stack.stackProps.className);

  return stack;
}
