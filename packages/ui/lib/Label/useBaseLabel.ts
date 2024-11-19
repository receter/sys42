// DOCS: The label must be rendered as a label element.

interface LabelProps {}

export type BaseLabelProps = Sys42Props<
  LabelProps,
  React.ComponentProps<"label">
>;

export type UseBaseLabelOptions<Props> = {
  props: Sys42Props<Props, React.ComponentProps<"label">>;
  forwardedRef: React.ForwardedRef<HTMLLabelElement>;
};

export function useBaseLabel<Props extends BaseLabelProps>({
  props,
  forwardedRef,
}: UseBaseLabelOptions<Props>) {
  return {
    elementProps: props,
    elementRef: forwardedRef,
  };
}
