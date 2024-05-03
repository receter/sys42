import { forwardRef } from 'react';
import { UseButtonParameters, useButton } from './useButton';

type HTMLAttributes1 = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps1 = UseButtonParameters<HTMLAttributes1, HTMLButtonElement>[0];

export const Button = forwardRef<HTMLButtonElement, ButtonProps1>((props, forwardedRef) => {
  const { buttonProps, ref } = useButton<HTMLAttributes1, HTMLButtonElement>(props, "button", forwardedRef);
  return <button {...buttonProps} ref={ref} />;
});

type HTMLAttributes2 = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps2 = UseButtonParameters<HTMLAttributes2, HTMLAnchorElement>[0];

export const ButtonA = forwardRef<HTMLAnchorElement, ButtonProps2>((props, forwardedRef) => {
  const { buttonProps, ref } = useButton<HTMLAttributes2, HTMLAnchorElement>(props, "a", forwardedRef);
  return <a {...buttonProps} ref={ref} />;
});
