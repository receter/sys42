import { RadioGroupContext } from "./context";
import { BaseRadioGroupRenderArgs } from "./useBaseRadioGroup";

export function renderRadioGroup(args: BaseRadioGroupRenderArgs) {
  const { children, ctx } = args;

  return (
    <RadioGroupContext.Provider value={ctx}>
      {children}
    </RadioGroupContext.Provider>
  );
}
