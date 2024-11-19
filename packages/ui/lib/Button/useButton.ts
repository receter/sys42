import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

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
};

export function useButton<
  Props extends ButtonProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseButtonOptions<Props, Elem>) {
  const { variant, size, ...restProps } = options.props;

  const button = useBaseButton({
    ...options,
    props: restProps,
  });

  button.elementProps.className = cn(
    button.elementProps.className,
    variant === "primary" && styles.button_primary,
    size === "lg" && styles.button_lg,
    styles.button,
  );

  return button;
}
