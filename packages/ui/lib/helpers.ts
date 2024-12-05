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
  // XXX: (!elementProps && elementProps) is a workaround to get rid of:
  // error TS6133: 'elementProps' is declared but its value is never read.
  // using @ts-expect-error leads to lib/helpers.ts:14:3 - error TS2578: Unused '@ts-expect-error' directive.
  // TODO: file a bug report to TypeScript?
  return elementType === tagName || (!elementProps && elementProps);
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
