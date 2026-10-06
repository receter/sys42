import { useMenuItem } from "../hooks/useMenuItem";

export type BaseSplitButtonItemProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  // Used for typeahead if the text content is not suitable (e.g. includes an icon)
  textValue?: string;
};

export function useBaseSplitButtonItem(
  {
    props,
    forwardedRef,
  }: UseComponentOptions<BaseSplitButtonItemProps, "button">,
  interceptor?: UseComponentInterceptor<"button">,
) {
  const { onClick, disabled, textValue, ...restProps } = props;

  const itemProps = useMenuItem({ onClick, disabled, textValue });

  const draft = {
    elementProps: {
      ...(restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<"button">),
      ...itemProps,
    },
  };

  interceptor?.(draft);

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
  };
}
