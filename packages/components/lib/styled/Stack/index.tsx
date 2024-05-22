import { forwardRef } from "react";
import { useStack } from "./useStack";
import { StackProps } from "../../unstyled/Stack/useUnstyledStack";
import { Sys42Props } from "../../types";

export const Stack = forwardRef<
  HTMLDivElement,
  Sys42Props<StackProps, React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { stackProps, stackRef } = useStack({
    props,
    elementType: "div",
    forwardedRef,
  });
  return <div {...stackProps} ref={stackRef} />;
});
