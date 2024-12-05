import { createComponent } from "../helpers";

import { TextLinkProps, useTextLink } from "./useTextLink";

export const TextLink = createComponent<TextLinkProps, "a">(
  "a",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return <a {...elementProps} ref={elementRef} />;
  },
);
