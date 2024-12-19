import { BaseLabeledControlRenderArgs } from "./useBaseLabeledControl";

export function renderLabeledControl(args: BaseLabeledControlRenderArgs) {
  const { control, label } = args;

  return (
    <>
      {control} {label}
    </>
  );
}
