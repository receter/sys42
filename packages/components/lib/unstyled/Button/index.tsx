import { forwardRef } from "react";
import { UnstyledButtonProps, useUnstyledButton } from "./useUnstyledButton";

export const Button = forwardRef<
  HTMLButtonElement,
  UnstyledButtonProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useUnstyledButton({
    props,
    elementType: "button",
    forwardedRef,
  });
  return <button {...buttonProps} ref={buttonRef} />;
});
