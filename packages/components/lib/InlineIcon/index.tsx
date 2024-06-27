import { InlineIconProps, useInlineIcon } from "./useInlineIcon";

// TODO: Add support for ref forwarding, this is not easy because we have to check if the IconComponent supports ref forwarding or not…

export const InlineIcon = (props: InlineIconProps) => {
  const { inlineIconProps, IconComponent } = useInlineIcon({
    props,
  });

  return <IconComponent {...inlineIconProps} />;
};
