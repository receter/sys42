import { concatClassNames as cn } from '@sys42/utils'

export type InlineIconProps = {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} & React.SVGProps<SVGSVGElement>;

interface InlineIconStyles {
  styles: {
    inlineIcon: string,
  };
}

export function InlineIcon(props: InlineIconProps & InlineIconStyles) {
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
