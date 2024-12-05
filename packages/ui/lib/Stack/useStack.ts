import { cn } from "@sys42/utils";

import { BaseStackProps, useBaseStack } from "./useBaseStack";

import styles from "./styles.module.css";

export type StackProps = BaseStackProps;

export function useStack<TagName extends HTMLElementTagName>(
  options: UseComponentOptions<StackProps, TagName>,
) {
  return useBaseStack(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.stack,
    );
  });
}
