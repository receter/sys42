import { concatClassNames as cn } from '@sys42/utils'
import { Sys42PolymorphicComponentProps, Sys42UnstyledComponentProps } from '../../types';
import { forwardRef } from 'react';

export type ButtonProps = Sys42PolymorphicComponentProps;

type UnstyledButtonProps = Sys42UnstyledComponentProps<ButtonProps, {
  button: string,
}>;

export const Button = forwardRef((
  props: UnstyledButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {

  const {
    className,
    as: asProp,
    type,
    styles,
    children,
    ...restProps
  } = props;

  const ComponentTag = asProp || 'button';

  // Always specify the type attribute for the <button> element. Different 
  // browsers may use different default types for the <button> element.
  const typeButton = ComponentTag === 'button' ? (type ?? 'button') : type;

  return <ComponentTag
    className={cn(
      className,
      styles.button,
    )}
    type={typeButton}
    {...restProps}
    ref={ref}
  >
    {children}
  </ComponentTag>;
});
