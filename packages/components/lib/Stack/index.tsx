import { forwardRef } from "react";

import { StackProps, useStack } from "./useStack";

export const Stack = forwardRef<
  HTMLDivElement,
  StackProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { stackProps, stackRef } = useStack({
    props,
    elementType: "div",
    forwardedRef,
  });
  return <div {...stackProps} ref={stackRef} />;
});
