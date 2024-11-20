import { HTMLAttributes } from "react";
import { cn } from "@sys42/utils";

import {
  BaseTextLinkProps,
  useBaseTextLink,
  UseBaseTextLinkOptions,
} from "./useBaseTextLink";

import styles from "./styles.module.css";

export type TextLinkProps<ElemProps> = BaseTextLinkProps<ElemProps>;

export function useTextLink<
  Props extends TextLinkProps<HTMLAttributes<HTMLElement>>,
  Elem extends HTMLElement,
>(options: UseBaseTextLinkOptions<Props, Elem>) {
  const { ...restProps } = options.props;

  const textLink = useBaseTextLink({
    ...options,
    props: restProps,
  });

  textLink.elementProps.className = cn(
    textLink.elementProps.className,
    options.elementType !== "a" && styles.textLinkNotAnchor,
    // styles.textLink,
  );

  return textLink;
}
