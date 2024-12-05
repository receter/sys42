import { useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { isPropsForElement } from "../helpers";

// This are our props that we want to expose as an interface to the Button component
export interface BaseButtonProps {}
// TODO: when there are no props I did not find a solution with a type so I use interface
// but this is not tested well and should be verified. Preferably there is a "type" solution
// Using Record<string | number | symbol, never> or EmptyObject does not work, it breaks
// the "props: baseProps satisfies …"  in useButton

export function useBaseButton<TagName extends HTMLElementTagName>(
  {
    props,
    elementType,
    forwardedRef,
  }: UseComponentOptions<BaseButtonProps, TagName>,
  interceptor?: UseComponentInterceptor<TagName>,
) {
  const ref = useRef<HTMLElementTagNameMap[TagName]>(null);

  const { ...restProps } = props;

  // restProps should now be an empty object in TypeScripts eyes
  const draft = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TagName>,
  };

  if (isPropsForElement(draft.elementProps, elementType, "button")) {
    // If the element is a button, we want to make sure it has a type attribute that defaults to button
    draft.elementProps.type = draft.elementProps.type ?? "button";
  }

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: mergeRefs([forwardedRef, ref]),
  };
}
