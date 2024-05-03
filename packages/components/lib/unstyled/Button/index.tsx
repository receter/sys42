import { forwardRef } from "react";
import { Sys42ButtonProps, useUnstyledButton } from "./useUnstyledButton";

type HTMLAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Sys42ButtonProps<HTMLAttributes>>((props, forwardedRef) => {
  const { buttonProps, ref } = useUnstyledButton<HTMLAttributes, HTMLButtonElement>(props, "button", forwardedRef);
  return <button {...buttonProps} ref={ref} />;
});