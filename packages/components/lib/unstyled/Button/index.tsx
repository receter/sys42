import { concatClassNames as cn } from '@sys42/utils'

export type ButtonProps = {
  as?: React.ElementType;
  children: React.ReactNode;
} & React.AllHTMLAttributes<HTMLElement>;
// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/

interface ButtonStyles {
  styles: {
    button: string,
  };
}

export function Button(props: ButtonProps & ButtonStyles) {

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