import { createComponent } from "../helpers";

import { TextLinkProps, useTextLink } from "./useTextLink";

export const TextLink = createComponent<TextLinkProps, "a">(
  "a",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return <a {...elementProps} ref={elementRef} />;
  },
);

export const TextLinkButton = createComponent<TextLinkProps, "button">(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return <button {...elementProps} ref={elementRef} />;
  },
);
