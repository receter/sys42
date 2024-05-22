import { forwardRef } from "react";
import { StackProps, useUnstyledStack } from "./useUnstyledStack";
import { Sys42Props } from "../../types";

export const Stack = forwardRef<
  HTMLDivElement,
  Sys42Props<StackProps, React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { stackProps, stackRef } = useUnstyledStack({
    props,
    elementType: "div",
    forwardedRef,
  });
  return <div {...stackProps} ref={stackRef} />;
});
