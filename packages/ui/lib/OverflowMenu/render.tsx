import { MenuContext } from "../hooks/useMenu";

import { BaseOverflowMenuRenderArgs } from "./useBaseOverflowMenu";

export function renderOverflowMenu(args: BaseOverflowMenuRenderArgs) {
  const { ctx, triggerProps, menuProps } = args;
  return (
    <MenuContext.Provider value={ctx}>
      <button {...triggerProps} />
      <div {...menuProps} />
    </MenuContext.Provider>
  );
}
