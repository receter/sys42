import { concatClassNames as cn } from "@sys42/utils";
import {
  UnstyledInlineIconProps,
  UseInlineIconOptions,
  useUnstyledInlineIcon,
} from "./useUnstyledInlineIcon";

import styles from "./styles.module.css";

export type InlineIconProps = UnstyledInlineIconProps;

export function useInlineIcon(
  options: UseInlineIconOptions<InlineIconProps>,
): ReturnType<typeof useUnstyledInlineIcon> {
  const inlineIcon = useUnstyledInlineIcon(options);

  inlineIcon.inlineIconProps.className = cn(
    styles.inlineIcon,
    inlineIcon.inlineIconProps.className,
  );

  return inlineIcon;
}
