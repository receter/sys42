// Define specific props for the component
// If no props are needed, a interface with an empty object can be used
export type BaseMessageProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export type BaseMessageDraft<TTagName extends HTMLElementTagName> = {
  elementProps: React.ComponentPropsWithoutRef<TTagName>;
  iconProps: React.ComponentPropsWithoutRef<"div">;
};

export type BaseMessageRenderArgs = {
  iconProps: React.ComponentPropsWithoutRef<"div">;
  children: React.ReactNode;
};

export function useBaseMessage<TTagName extends HTMLElementTagName>(
  { props, forwardedRef }: UseComponentOptions<BaseMessageProps, TTagName>,
  interceptor?: UseComponentInterceptor<TTagName, BaseMessageDraft<TTagName>>,
) {
  const { icon, children, ...restProps } = props;

  const draft: BaseMessageDraft<TTagName> = {
    elementProps:
      restProps satisfies EmptyObject as React.ComponentPropsWithoutRef<TTagName>,
    iconProps: {
      children: icon,
    },
  };

  interceptor?.(draft);

  const renderArgs: BaseMessageRenderArgs = {
    iconProps: draft.iconProps,
    children,
  };

  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs,
  };
}
