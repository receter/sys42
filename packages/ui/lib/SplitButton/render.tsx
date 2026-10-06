import { MenuContext } from "../hooks/useMenu";

import { BaseSplitButtonRenderArgs } from "./useBaseSplitButton";

export function renderSplitButton(args: BaseSplitButtonRenderArgs) {
  const { ctx, buttonProps, toggleProps, menuProps } = args;
  return (
    <MenuContext.Provider value={ctx}>
      <button {...buttonProps} />
      <button {...toggleProps} />
      <div {...menuProps} />
    </MenuContext.Provider>
  );
}
