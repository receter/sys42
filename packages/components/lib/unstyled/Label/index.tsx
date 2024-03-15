import { concatClassNames as cn } from '@sys42/utils'
import { Sys42ComponentProps, Sys42UnstyledComponentProps } from '../../types';

export type LabelProps = Sys42ComponentProps;

type UnstyledLabelProps = Sys42UnstyledComponentProps<LabelProps, {
  label: string,
}>;

export function Label(props: UnstyledLabelProps) {
  const {
    className,
    styles,
    ...restProps
  } = props;

  return (
    <label {...restProps} className={cn(styles.label, className)} />
  );
}