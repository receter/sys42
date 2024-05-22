import { forwardRef } from "react";
import { UnstyledLabelProps, useUnstyledLabel } from "./useUnstyledLabel";

export const Label = forwardRef<HTMLLabelElement, UnstyledLabelProps>(
  (props, forwardedRef) => {
    const { labelProps, labelRef } = useUnstyledLabel({ props, forwardedRef });
    return <label {...labelProps} ref={labelRef} />;
  },
);
