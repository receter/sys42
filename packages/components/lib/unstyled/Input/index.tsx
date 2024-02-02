import { concatClassNames as cn } from '@sys42/utils'
import { Sys42Component, Sys42UnstyledComponent } from '../../types';

export type InputProps = Sys42Component<React.InputHTMLAttributes<HTMLInputElement>>;

type UnstyledInputProps = Sys42UnstyledComponent<InputProps, {
  input: string,
}>;

export function Input(props: UnstyledInputProps) {
  const {
    className,
    styles,
    ...restProps
  } = props;

  return (
    <input {...restProps} className={cn(styles.input, className)} />
  );
}