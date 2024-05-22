import { forwardRef } from "react";
import { UnstyledStackProps, useUnstyledStack } from "./useUnstyledStack";

export const Stack = forwardRef<
  HTMLDivElement,
  UnstyledStackProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { stackProps, stackRef } = useUnstyledStack({
    props,
    elementType: "div",
    forwardedRef,
  });
  return <div {...stackProps} ref={stackRef} />;
});
