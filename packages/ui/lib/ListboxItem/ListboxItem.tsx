import { createComponent } from "../helpers";

import { ListboxItemProps, useListboxItem } from "./useListboxItem";

// DOC: Only works as a direct child of Listbox (fragments are supported),
// because Listbox has to know all items up front
export const ListboxItem = createComponent<ListboxItemProps, "li">(
  "li",
  (hookOptions) => {
    const { elementProps, elementRef } = useListboxItem(hookOptions);
    return <li {...elementProps} ref={elementRef} />;
  },
);
