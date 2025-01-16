import { createComponent } from "../helpers";

import { renderMessage } from "./render";
import { MessageProps, useMessage } from "./useMessage";

export const Message = createComponent<MessageProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useMessage(hookOptions);
    return (
      <div {...elementProps} ref={elementRef}>
        {renderMessage(renderArgs)}
      </div>
    );
  },
);
