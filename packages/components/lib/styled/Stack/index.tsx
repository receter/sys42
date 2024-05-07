import { forwardRef } from 'react';
import { useStack } from './useStack';
import { StackProps } from '../../unstyled/Stack/useUnstyledStack';
import { Sys42Props } from '../../types';

type HTMLAttributesStack = React.HTMLAttributes<HTMLDivElement>;

export const Stack = forwardRef<HTMLDivElement, Sys42Props<HTMLAttributesStack, StackProps>>((props, forwardedRef) => {
  const { stackProps, stackRef } = useStack({ props, elementType: "div", forwardedRef });
  return <div {...stackProps} ref={stackRef} />;
});
