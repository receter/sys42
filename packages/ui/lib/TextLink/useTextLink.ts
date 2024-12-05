import { cn } from "@sys42/utils";

import { BaseTextLinkProps, useBaseTextLink } from "./useBaseTextLink";

import styles from "./styles.module.css";

export type TextLinkProps = BaseTextLinkProps;

export function useTextLink<TagName extends HTMLElementTagName>(
  options: UseComponentOptions<TextLinkProps, TagName>,
) {
  return useBaseTextLink(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      options.elementType !== "a" && styles.textLinkNotAnchor,
    );
  });
}
