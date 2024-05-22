import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { Sys42Props } from "../../types";

export type InlineIconIconProps = React.HTMLAttributes<HTMLElement> &
  React.SVGProps<SVGSVGElement>;

export type UnstyledInlineIconProps = Sys42Props<
  {
    Icon:
      | React.FunctionComponent<
          React.PropsWithoutRef<InlineIconIconProps> &
            React.RefAttributes<HTMLElement | SVGElement>
        >
      | React.FunctionComponent<
          React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
          }
        >;
  },
  InlineIconIconProps
>;

export type UseInlineIconOptions<Props> = {
  props: Props;
  forwardedRef: React.ForwardedRef<HTMLElement | SVGElement>;
};

export function useUnstyledInlineIcon<Props extends UnstyledInlineIconProps>({
  props,
  forwardedRef,
}: UseInlineIconOptions<Props>) {
  const { Icon, ...passedOnProps } = props;

  const ref = useRef<HTMLElement | SVGElement>(null);

  const inlineIconProps: InlineIconIconProps = {
    ...passedOnProps,
  };

  return {
    inlineIconProps,
    inlineIconRef: mergeRefs([forwardedRef, ref]),
    IconComponent: Icon,
  };
}
