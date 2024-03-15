import { concatClassNames as cn } from '@sys42/utils'
import { Sys42ComponentProps, Sys42UnstyledComponentProps } from '../../types';

export type InlineIconProps = Sys42ComponentProps<React.SVGProps<SVGSVGElement>> & {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type UnstyledInlineIconProps = Sys42UnstyledComponentProps<InlineIconProps, {
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
