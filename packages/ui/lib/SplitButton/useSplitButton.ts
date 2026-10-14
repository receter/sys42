import { cn } from "@sys42/utils";

import { BaseSplitButtonProps, useBaseSplitButton } from "./useBaseSplitButton";

import styles from "./styles.module.css";

export type SplitButtonProps = BaseSplitButtonProps & {
  variant?: "accent" | "highlight" | "danger";
  size?: "lg";
};

export function useSplitButton<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<SplitButtonProps, TTagName>,
) {
  const { variant, size, ...baseProps } = options.props;

  return useBaseSplitButton(
    {
      ...options,
      props: baseProps satisfies ExactProps<
        BaseSplitButtonProps,
        SplitButtonProps
      >,
    },
    (draft, ctx) => {
      draft.elementProps.className = cn(
        draft.elementProps.className,
        styles.splitButton,
        variant === "accent" && styles.splitButton_accent,
        variant === "highlight" && styles.splitButton_highlight,
        variant === "danger" && styles.splitButton_danger,
        size === "lg" && styles.splitButton_lg,
        ctx.isOpen && styles.splitButton_isOpen,
      );
      draft.buttonProps.className = cn(
        draft.buttonProps.className,
        styles.button,
      );
      draft.toggleProps.className = cn(
        draft.toggleProps.className,
        styles.button,
        styles.toggle,
      );
      draft.menuProps.className = cn(draft.menuProps.className, styles.menu);
    },
  );
}
