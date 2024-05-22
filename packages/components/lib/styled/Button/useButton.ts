import { concatClassNames as cn } from "@sys42/utils";
import {
  UseButtonOptions,
  UnstyledButtonProps,
  useUnstyledButton,
} from "../../unstyled/Button/useUnstyledButton";

import styles from "./styles.module.css";

// DOC: Props that are specific to the styled version of the button can be added at this point.
export type ButtonProps<ElemProps = void> = UnstyledButtonProps<ElemProps> & {
  variant?: "primary";
};

export function useButton<Props extends ButtonProps, Elem extends HTMLElement>(
  options: UseButtonOptions<Props, Elem>,
) {
  const { variant, ...restProps } = options.props;

  const button = useUnstyledButton({
    ...options,
    props: restProps,
  });

  // DOC: The classname is never set by unstyled hooks, so we can just override it here.
  button.buttonProps.className = cn(
    variant && styles[`button_${variant}`],
    styles.button,
  );

  return button;
}
