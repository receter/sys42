import { OverflowMenuContext } from "./context";
import { BaseOverflowMenuRenderArgs } from "./useBaseOverflowMenu";
export function renderOverflowMenu(args: BaseOverflowMenuRenderArgs) {
  const { ctx, triggerProps, menuProps, triggerRef, menuRef } = args;
  return (
    <OverflowMenuContext.Provider value={ctx}>
      <button {...triggerProps} ref={triggerRef} />
      <div {...menuProps} ref={menuRef} />
    </OverflowMenuContext.Provider>
  );
}
