import { CheckboxGroupContext } from "./context";
import { BaseCheckboxGroupRenderArgs } from "./useBaseCheckboxGroup";

export function renderCheckboxGroup(args: BaseCheckboxGroupRenderArgs) {
  const { children, ctx } = args;

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      {children}
    </CheckboxGroupContext.Provider>
  );
}
