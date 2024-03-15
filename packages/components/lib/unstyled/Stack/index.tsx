import { concatClassNames as cn } from '@sys42/utils'
import { Sys42ComponentProps, Sys42UnstyledComponentProps } from '../../types';
import { knownSpacingAbbreviations } from '../../helpers';
import { useMemo } from 'react';

export type StackProps = Sys42ComponentProps & {
  spacing: string,
};

type UnstyledStackProps = Sys42UnstyledComponentProps<StackProps, {
  stack: string,
}>;

export function Stack(props: UnstyledStackProps) {
  const {
    className,
    styles,
    style,
    spacing = "md",
    ...restProps
  } = props;

  const style2 = useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        spacingValue = `var(--sys42-spacing-${spacing})`;
      }
      return {
        ...style,
        "--sys42-stack-spacing": spacingValue,
      };
    } else {
      return style;
    }
  }, [spacing, style]);

  return (
    <div {...restProps} style={style2} className={cn(styles.stack, className)} />
  );
}