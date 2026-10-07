import { createComponent } from "../helpers";

import { SelectProps, useSelect } from "./useSelect";

// DOC: Native <select>, use Option for its options.
// For a custom styled dropdown with rich content use Listbox.
export const Select = createComponent<SelectProps, "select">(
  "select",
  (hookOptions) => {
    const { elementProps, elementRef } = useSelect(hookOptions);
    return <select {...elementProps} ref={elementRef} />;
  },
);
