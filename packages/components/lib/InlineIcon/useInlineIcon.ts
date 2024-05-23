import { concatClassNames as cn } from "@sys42/utils";

import {
  BaseInlineIconProps,
  useBaseInlineIcon,
  UseInlineIconOptions,
} from "./useBaseInlineIcon";

import styles from "./styles.module.css";

export type InlineIconProps = BaseInlineIconProps;

export function useInlineIcon(
  options: UseInlineIconOptions<InlineIconProps>,
): ReturnType<typeof useBaseInlineIcon> {
  const inlineIcon = useBaseInlineIcon(options);

  inlineIcon.inlineIconProps.className = cn(
    styles.inlineIcon,
    inlineIcon.inlineIconProps.className,
  );

  return inlineIcon;
}
