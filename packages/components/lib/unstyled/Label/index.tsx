import { concatClassNames as cn } from '@sys42/utils'
import { Sys42Component, Sys42UnstyledComponent } from '../../types';

export type LabelProps = Sys42Component;

type UnstyledLabelProps = Sys42UnstyledComponent<LabelProps, {
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