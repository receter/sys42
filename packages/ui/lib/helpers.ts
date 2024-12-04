import { forwardRef } from "react";

export const knownSpacingAbbreviations = [
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
];

export function isPropsForElement<TagName extends HTMLElementTagName>(
  elementProps: Record<string, unknown>,
  elementType: HTMLElementTagName,
  tagName: TagName,
): elementProps is React.ComponentPropsWithoutRef<TagName> {
  return elementType === tagName;
}

export function createComponent<
  CustomProps,
  TagName extends HTMLElementTagName,
>(
  elementType: TagName,
  factory: (
    hookOptions: UseComponentOptions<CustomProps, TagName>,
  ) => React.ReactElement,
) {
  return forwardRef<
    HTMLElementTagNameMap[TagName],
    Sys42Props<CustomProps, TagName>
  >((props, forwardedRef) => {
    return factory({ props: props as CustomProps, forwardedRef, elementType });
  });
}
