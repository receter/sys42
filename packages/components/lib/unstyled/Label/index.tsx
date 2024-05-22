import { forwardRef } from "react";
import { LabelProps, useUnstyledLabel } from "./useUnstyledLabel";
import { Sys42Props } from "../../types";

export const Label = forwardRef<
  HTMLLabelElement,
  Sys42Props<LabelProps, React.ComponentProps<"label">>
>((props, forwardedRef) => {
  const { labelProps, labelRef } = useUnstyledLabel({ props, forwardedRef });
  return <label {...labelProps} ref={labelRef} />;
});
