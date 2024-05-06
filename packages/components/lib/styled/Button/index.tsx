import { forwardRef } from 'react';
import { useButton } from './useButton';
import { ButtonProps } from '../../unstyled/Button/useUnstyledButton';
import { Sys42Props } from '../../types';

type HTMLAttributesButton = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps1 = Sys42Props<HTMLAttributesButton, ButtonProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps1>((props, forwardedRef) => {
  const { buttonProps, buttonRef } = useButton({ props, elementType: "button", forwardedRef });
  return <button {...buttonProps} ref={buttonRef} />;
});

type HTMLAttributesAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps2 = Sys42Props<HTMLAttributesAnchor, ButtonProps>;

export const ButtonA = forwardRef<HTMLAnchorElement, ButtonProps2>((props, forwardedRef) => {
  const { buttonProps, buttonRef: ref } = useButton({ props, elementType: "a", forwardedRef });
  return <a {...buttonProps} ref={ref} />;
});
