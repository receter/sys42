import { cn } from "@sys42/utils";

import { BaseMessageProps, useBaseMessage } from "./useBaseMessage";

import styles from "./styles.module.css";

export type MessageProps = BaseMessageProps & {
  variant?: "info" | "success" | "warning" | "error";
};

export function useMessage<TTagName extends HTMLElementTagName>(
  options: UseComponentOptions<MessageProps, TTagName>,
) {
  const { variant, ...baseProps } = options.props;

  return useBaseMessage(
    {
      ...options,
      props: baseProps satisfies ExactProps<BaseMessageProps, MessageProps>,
    },
    (draft) => {
      draft.iconProps.className = cn(draft.iconProps.className, styles.icon);
      draft.elementProps.className = cn(
        draft.elementProps.className,
        variant === "info" && styles.message_info,
        variant === "success" && styles.message_success,
        variant === "warning" && styles.message_warning,
        variant === "error" && styles.message_error,
        styles.message,
      );
    },
  );
}
