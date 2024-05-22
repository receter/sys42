import { forwardRef } from "react";
import { useLabel } from "./useLabel";
import { LabelProps } from "../../unstyled/Label/useUnstyledLabel";
import { Sys42Props } from "../../types";

export const Label = forwardRef<
  HTMLLabelElement,
  Sys42Props<LabelProps, React.ComponentProps<"label">>
>((props, forwardedRef) => {
  const { labelProps, labelRef } = useLabel({ props, forwardedRef });
  return <label {...labelProps} ref={labelRef} />;
});
