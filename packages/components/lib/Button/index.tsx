import { forwardRef } from "react";
import { ButtonProps, useButton } from "./useButton";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useButton({
    props,
    elementType: "button",
    forwardedRef,
  });
  return <button {...buttonProps} ref={buttonRef} />;
});

export const ButtonA = forwardRef<
  HTMLAnchorElement,
  ButtonProps<React.ComponentProps<"a">>
>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useButton({
    props,
    elementType: "a",
    forwardedRef,
  });

  return <a {...buttonProps} ref={buttonRef} />;
});
