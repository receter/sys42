import { concatClassNames as cn } from "@sys42/utils";
import {
  UseInlineIconOptions,
  useUnstyledInlineIcon,
} from "../../unstyled/InlineIcon/useUnstyledInlineIcon";

import styles from "./styles.module.css";

export function useInlineIcon(
  options: UseInlineIconOptions,
): ReturnType<typeof useUnstyledInlineIcon> {
  const inlineIcon = useUnstyledInlineIcon(options);
  return {
    ...inlineIcon,
    inlineIconProps: {
      ...inlineIcon.inlineIconProps,
      className: cn(styles.inlineIcon, inlineIcon.inlineIconProps.className),
    },
  };
}
