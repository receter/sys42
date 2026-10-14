import { cn } from "@sys42/utils";

import { BaseMenuButtonProps, useBaseMenuButton } from "./useBaseMenuButton";

import styles from "./styles.module.css";

export type MenuButtonProps = BaseMenuButtonProps & {
  variant?: "accent" | "highlight" | "danger";
  size?: "lg";
};

export function useMenuButton<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<MenuButtonProps, TTagName>,
) {
  const { variant, size, ...baseProps } = options.props;

  return useBaseMenuButton(
    {
      ...options,
      props: baseProps satisfies ExactProps<
        BaseMenuButtonProps,
        MenuButtonProps
      >,
    },
    (draft, ctx) => {
      draft.elementProps.className = cn(
        draft.elementProps.className,
        styles.menuButton,
        variant === "accent" && styles.menuButton_accent,
        variant === "highlight" && styles.menuButton_highlight,
        variant === "danger" && styles.menuButton_danger,
        size === "lg" && styles.menuButton_lg,
        ctx.isOpen && styles.menuButton_isOpen,
      );
      draft.triggerProps.className = cn(
        draft.triggerProps.className,
        styles.button,
      );
      draft.menuProps.className = cn(draft.menuProps.className, styles.menu);
    },
  );
}
