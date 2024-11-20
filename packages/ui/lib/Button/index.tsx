import { forwardRef } from "react";

import { ButtonProps, useButton } from "./useButton";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { elementProps, elementRef } = useButton({
    props,
    elementType: "button",
    forwardedRef,
  });
  return <button {...elementProps} ref={elementRef} />;
});

export const ButtonA = forwardRef<
  HTMLAnchorElement,
  ButtonProps<React.ComponentProps<"a">>
>((props, forwardedRef) => {
  const { elementProps, elementRef } = useButton({
    props,
    elementType: "a",
    forwardedRef,
  });

  return <a {...elementProps} ref={elementRef} />;
});
