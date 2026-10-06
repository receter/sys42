import { createComponent } from "../helpers";

import { renderListbox } from "./render";
import { ListboxProps, useListbox } from "./useListbox";

export const Listbox = createComponent<ListboxProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useListbox(hookOptions);
    return (
      <div {...elementProps} ref={elementRef}>
        {renderListbox(renderArgs)}
      </div>
    );
  },
);
