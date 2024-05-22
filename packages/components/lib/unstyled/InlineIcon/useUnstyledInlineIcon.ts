import React, { useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { Sys42Props } from "../../types";

export type InlineIconIconProps = React.HTMLAttributes<HTMLElement> &
  React.SVGProps<SVGSVGElement>;

export type InlineIconProps = {
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
};

export type UseInlineIconOptions = {
  props: Sys42Props<InlineIconProps, InlineIconIconProps>;
  forwardedRef: React.ForwardedRef<HTMLElement | SVGElement>;
};

export function useUnstyledInlineIcon({
  props,
  forwardedRef,
}: UseInlineIconOptions) {
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
