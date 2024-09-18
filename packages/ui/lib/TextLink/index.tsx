import { forwardRef } from "react";

import { TextLinkProps, useTextLink } from "./useTextLink";

export const TextLink = forwardRef<
  HTMLAnchorElement,
  TextLinkProps<React.ComponentProps<"a">>
>((props, forwardedRef) => {
  const { textLinkProps, textLinkRef } = useTextLink({
    props,
    elementType: "a",
    forwardedRef,
  });
  return <a {...textLinkProps} ref={textLinkRef} />;
});

export const TextLinkButton = forwardRef<
  HTMLButtonElement,
  TextLinkProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { textLinkProps, textLinkRef } = useTextLink({
    props,
    elementType: "button",
    forwardedRef,
  });

  return <button {...textLinkProps} ref={textLinkRef} />;
});
