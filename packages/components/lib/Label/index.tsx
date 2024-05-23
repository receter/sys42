import { forwardRef } from "react";
import { LabelProps, useLabel } from "./useLabel";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, forwardedRef) => {
    const { labelProps, labelRef } = useLabel({ props, forwardedRef });
    return <label {...labelProps} ref={labelRef} />;
  },
);
