import { OverflowMenuContext, OverflowMenuContextType } from "./context";
export function renderOverflowMenu(args: {
  ctx: OverflowMenuContextType;
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuProps: React.HTMLAttributes<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
}) {
  const { ctx, triggerProps, menuProps, triggerRef, menuRef } = args;
  return (
    <OverflowMenuContext.Provider value={ctx}>
      <button {...triggerProps} ref={triggerRef} />
      <div {...menuProps} ref={menuRef} />
    </OverflowMenuContext.Provider>
  );
}
