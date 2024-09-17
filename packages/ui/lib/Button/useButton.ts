import { HTMLAttributes } from "react";
import { concatClassNames as cn } from "@sys42/utils";

import {
  BaseButtonProps,
  useBaseButton,
  UseBaseButtonOptions,
} from "./useBaseButton";

import styles from "./styles.module.css";

// DOC: Props that are specific to the styled version of the button can be added at this point.
export type ButtonProps<ElemProps> = BaseButtonProps<ElemProps> & {
  variant?: "primary";
  size?: "lg";
  isFullWidth?: boolean;
};

export function useButton<
  Props extends ButtonProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseButtonOptions<Props, Elem>) {
  const { variant, size, isFullWidth, ...restProps } = options.props;

  const button = useBaseButton({
    ...options,
    props: restProps,
  });

  button.buttonProps.className = cn(
    button.buttonProps.className,
    variant === "primary" && styles.button_primary,
    size === "lg" && styles.button_lg,
    isFullWidth && styles.button_fullWidth,
    button.buttonIsPressed && styles.button_pressed,
    styles.button,
  );

  return button;
}
