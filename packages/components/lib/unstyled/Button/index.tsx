import { forwardRef } from "react";
import { useUnstyledButton } from "./useUnstyledButton";

type HTMLAttributes1 = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps1 = Parameters<typeof useUnstyledButton<HTMLAttributes1, HTMLButtonElement>>[0];

export const Button = forwardRef<HTMLButtonElement, ButtonProps1>((props, forwardedRef) => {
  const { buttonProps, ref } = useUnstyledButton<HTMLAttributes1, HTMLButtonElement>(props, "button", forwardedRef);
  return <button {...buttonProps} ref={ref} />;
});

type HTMLAttributes2 = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps2 = Parameters<typeof useUnstyledButton<HTMLAttributes2, HTMLAnchorElement>>[0];

export const ButtonA = forwardRef<HTMLAnchorElement, ButtonProps2>((props, forwardedRef) => {
  const { buttonProps, ref } = useUnstyledButton<HTMLAttributes2, HTMLAnchorElement>(props, "a", forwardedRef);
  return <a {...buttonProps} ref={ref} />;
});
