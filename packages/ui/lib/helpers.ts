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

export function isPropsForElement<TTagName extends HTMLElementTagName>(
  elementProps: Record<string, unknown>,
  elementType: HTMLElementTagName,
  tagName: TTagName,
): elementProps is React.ComponentPropsWithoutRef<TTagName> {
  // XXX: (!elementProps && elementProps) is a workaround to get rid of:
  // error TS6133: 'elementProps' is declared but its value is never read.
  // using @ts-expect-error leads to lib/helpers.ts:14:3 - error TS2578: Unused '@ts-expect-error' directive.
  // TODO: file a bug report to TypeScript?
  return elementType === tagName || (!elementProps && elementProps);
}

export function createComponent<
  TCustomProps,
  TTagName extends HTMLElementTagName,
>(
  elementType: TTagName,
  factory: (
    hookOptions: UseComponentOptions<TCustomProps, TTagName>,
  ) => React.ReactElement,
) {
  return forwardRef<
    HTMLElementTagNameMap[TTagName],
    Sys42Props<TCustomProps, TTagName>
  >((props, forwardedRef) => {
    return factory({ props: props as TCustomProps, forwardedRef, elementType });
  });
}
