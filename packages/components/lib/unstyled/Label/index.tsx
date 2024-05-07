import { forwardRef } from "react";
import { LabelProps, useUnstyledLabel } from "./useUnstyledLabel";
import { Sys42Props } from "../../types";

type HTMLAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, Sys42Props<HTMLAttributes, LabelProps>>((props, forwardedRef) => {
  const { labelProps, labelRef } = useUnstyledLabel({ props, forwardedRef });
  return <label {...labelProps} ref={labelRef} />;
});