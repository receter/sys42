import { concatClassNames as cn } from '@sys42/utils'
import { Sys42Component, Sys42UnstyledComponent } from '../../types';

export type InlineIconProps = Sys42Component<React.SVGProps<SVGSVGElement>> & {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type UnstyledInlineIconProps = Sys42UnstyledComponent<InlineIconProps, {
  inlineIcon: string,
}>;

export function InlineIcon(props: UnstyledInlineIconProps) {
  const {
    className,
    Svg,
    styles,
    ...svgProps
  } = props;

  return (
    <Svg {...svgProps} className={cn(styles.inlineIcon, className)} />
  );
}
