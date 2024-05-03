import { forwardRef } from 'react';
import { useButton } from './useButton';
import { Sys42ButtonProps } from '../../unstyled/Button/useUnstyledButton';

type HTMLAttributesButton = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps1 = Sys42ButtonProps<HTMLAttributesButton>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps1>((props, forwardedRef) => {
  const { buttonProps, ref } = useButton<HTMLAttributesButton, HTMLButtonElement>(props, "button", forwardedRef);
  return <button {...buttonProps} ref={ref} />;
});

type HTMLAttributesAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps2 = Sys42ButtonProps<HTMLAttributesAnchor>;

export const ButtonA = forwardRef<HTMLAnchorElement, ButtonProps2>((props, forwardedRef) => {
  const { buttonProps, ref } = useButton<HTMLAttributesAnchor, HTMLAnchorElement>(props, "a", forwardedRef);
  return <a {...buttonProps} ref={ref} />;
});
