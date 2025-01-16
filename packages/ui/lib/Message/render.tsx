import { BaseMessageRenderArgs } from "./useBaseMessage";

export function renderMessage(args: BaseMessageRenderArgs) {
  const { children, iconProps } = args;

  return (
    <>
      {iconProps.children && <div {...iconProps} />}
      {children}
    </>
  );
}
