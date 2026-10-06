import { createComponent } from "../helpers";

import { MenuButtonItemProps, useMenuButtonItem } from "./useMenuButtonItem";

// DOC: Item for MenuButton
export const MenuButtonItem = createComponent<MenuButtonItemProps, "button">(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useMenuButtonItem(hookOptions);
    return <button {...elementProps} ref={elementRef} />;
  },
);
