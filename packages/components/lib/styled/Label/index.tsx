import { forwardRef } from "react";
import { useLabel } from "./useLabel";
import { LabelProps } from "../../unstyled/Label/useUnstyledLabel";
import { Sys42Props } from "../../types";

type HTMLAttributesLabel = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<
  HTMLLabelElement,
  Sys42Props<HTMLAttributesLabel, LabelProps>
>((props, forwardedRef) => {
  const { labelProps, labelRef } = useLabel({ props, forwardedRef });
  return <label {...labelProps} ref={labelRef} />;
});
