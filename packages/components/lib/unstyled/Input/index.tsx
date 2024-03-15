import { concatClassNames as cn } from '@sys42/utils'
import { Sys42ComponentProps, Sys42UnstyledComponentProps } from '../../types';

export type InputProps = Sys42ComponentProps<React.InputHTMLAttributes<HTMLInputElement>>;

type UnstyledInputProps = Sys42UnstyledComponentProps<InputProps, {
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