import { createComponent } from "../helpers";

import { BaseOptionProps, useBaseOption } from "./useBaseOption";

export type OptionProps = BaseOptionProps;

// DOC: Native <option> for Select. It has no styles (options of a native
// select can hardly be styled), so there is no styled useOption hook.
export const Option = createComponent<OptionProps, "option">(
  "option",
  (hookOptions) => {
    const { elementProps, elementRef } = useBaseOption(hookOptions);
    return <option {...elementProps} ref={elementRef} />;
  },
);
