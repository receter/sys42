import { MenuContext } from "../hooks/useMenu";

import { BaseMenuButtonRenderArgs } from "./useBaseMenuButton";

export function renderMenuButton(args: BaseMenuButtonRenderArgs) {
  const { ctx, triggerProps, icon, menuProps } = args;
  const { children: label, ...restTriggerProps } = triggerProps;
  return (
    <MenuContext.Provider value={ctx}>
      <button {...restTriggerProps}>
        {label}
        {icon}
      </button>
      <div {...menuProps} />
    </MenuContext.Provider>
  );
}
