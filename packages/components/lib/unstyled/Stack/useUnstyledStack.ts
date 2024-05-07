import React, { useMemo, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Sys42Props } from '../../types';
import { knownSpacingAbbreviations } from '../../helpers';

// This are our props that we want to expose as an interface to the Stack component
// Further we also define attributes that the component "consumes" here
export type StackProps = {
  spacing: string,
  style?: React.CSSProperties,
}

export type UseStackOptions<ElemAttr, Elem extends HTMLElement> = {
  props: Sys42Props<ElemAttr, StackProps>,
  elementType: keyof JSX.IntrinsicElements,
  forwardedRef: React.ForwardedRef<Elem>,
}

export function useUnstyledStack<ElemAttr, Elem extends HTMLElement>(
  { props, forwardedRef }: UseStackOptions<ElemAttr, Elem>
) {

  // When we split our props (StackProps) all props that remain will be props
  // that are defined in ElemAttr but not in StackProps
  const {
    spacing = "md",
    style: passedStyle,
    ...passedOnProps
  } = props;

  const ref = useRef<Elem>(null);

  const style = useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        spacingValue = `var(--sys42-spacing-${spacing})`;
      }
      return {
        ...passedStyle,
        "--sys42-stack-spacing": spacingValue,
      };
    } else {
      return passedStyle;
    }
  }, [spacing, passedStyle]);

  const stackProps: React.HTMLAttributes<HTMLElement> = {
    style,
    ...passedOnProps,
  }

  return { stackProps, stackRef: mergeRefs([forwardedRef, ref]) };
}