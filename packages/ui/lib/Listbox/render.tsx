import { ListboxContext } from "./context";
import { BaseListboxRenderArgs } from "./useBaseListbox";

export function renderListbox(args: BaseListboxRenderArgs) {
  const { ctx, toggleProps, menuProps, children, inputProps } = args;
  return (
    <ListboxContext.Provider value={ctx}>
      <button {...toggleProps} />
      <ul {...menuProps}>{children}</ul>
      {inputProps && <input {...inputProps} />}
    </ListboxContext.Provider>
  );
}
