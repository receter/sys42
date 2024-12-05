import { createComponent } from "../helpers";

import { TextLinkProps, useTextLink } from "./useTextLink";

export const TextLinkButton = createComponent<TextLinkProps, "button">(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return <button {...elementProps} ref={elementRef} />;
  },
);
