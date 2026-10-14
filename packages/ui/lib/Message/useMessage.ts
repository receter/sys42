import { cn } from "@sys42/utils";

import { BaseMessageProps, useBaseMessage } from "./useBaseMessage";

import styles from "./styles.module.css";

export type MessageProps = BaseMessageProps & {
  variant?: "success" | "warning" | "danger";
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
        variant === "success" && styles.message_success,
        variant === "warning" && styles.message_warning,
        variant === "danger" && styles.message_danger,
        styles.message,
      );
    },
  );
}
