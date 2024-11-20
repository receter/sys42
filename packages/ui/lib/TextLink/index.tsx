import { forwardRef } from "react";

import { TextLinkProps, useTextLink } from "./useTextLink";

export const TextLink = forwardRef<
  HTMLAnchorElement,
  TextLinkProps<React.ComponentProps<"a">>
>((props, forwardedRef) => {
  const { elementProps, elementRef } = useTextLink({
    props,
    elementType: "a",
    forwardedRef,
  });
  return <a {...elementProps} ref={elementRef} />;
});

export const TextLinkButton = forwardRef<
  HTMLButtonElement,
  TextLinkProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { elementProps, elementRef } = useTextLink({
    props,
    elementType: "button",
    forwardedRef,
  });

  return <button {...elementProps} ref={elementRef} />;
});
