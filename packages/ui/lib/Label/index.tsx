import { forwardRef } from "react";

import { LabelProps, useLabel } from "./useLabel";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, forwardedRef) => {
    const { elementProps, elementRef } = useLabel({
      props,
      forwardedRef,
    });
    return <label {...elementProps} ref={elementRef} />;
  },
);
