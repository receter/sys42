import { forwardRef } from "react";
import { StackProps, useUnstyledStack } from "./useUnstyledStack";
import { Sys42Props } from "../../types";

type HTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export const Stack = forwardRef<HTMLDivElement, Sys42Props<HTMLAttributes, StackProps>>((props, forwardedRef) => {
  const { stackProps, stackRef } = useUnstyledStack({ props, elementType: "div", forwardedRef });
  return <div {...stackProps} ref={stackRef} />;
});