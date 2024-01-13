import { concatClassNames as cn } from '@sys42/utils'
import { Sys42PolymorphicComponent, Sys42UnstyledComponent } from '../../types';

export type ButtonProps = Sys42PolymorphicComponent;

type UnstyledButtonProps = Sys42UnstyledComponent<ButtonProps, {
  button: string,
}>;

export function Button(props: UnstyledButtonProps) {

  const {
    className,
    as: asProp,
    type,
    styles,
    children,
    ...restProps
  } = props;

  const ComponentTag = asProp || 'button';

  // use type="button" instead of type="submit" by default if tag is button
  const typeButton = ComponentTag === 'button' ? (type ?? 'button') : type;

  return <ComponentTag
    className={cn(
      className,
      styles.button,
    )}
    type={typeButton}
    {...restProps}
  >
    {children}
  </ComponentTag>;
}