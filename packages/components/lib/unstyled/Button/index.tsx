import { forwardRef } from "react";
import { ButtonProps, useUnstyledButton } from "./useUnstyledButton";
import { Sys42Props } from "../../types";

type HTMLAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Sys42Props<HTMLAttributes, ButtonProps>>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useUnstyledButton({ props, elementType: "button", forwardedRef });
  return <button {...buttonProps} ref={buttonRef} />;
});