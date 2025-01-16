import { useValue } from "react-cosmos/client";

import { Message, Stack } from "../lib/main";

export default function LabelFixture() {
  const [content] = useValue("Content", { defaultValue: "This is a message" });
  const [isIcon] = useValue("Icon", { defaultValue: false });
  const icon = isIcon ? "🚀" : undefined;
  return (
    <div style={{ padding: "1rem" }}>
      <Stack>
        <div>
          <strong>Default:</strong>
          <Message icon={icon}>{content}</Message>
        </div>
        <div>
          <strong>Info:</strong>
          <Message variant={"info"} icon={icon}>
            {content}
          </Message>
        </div>
        <div>
          <strong>Success:</strong>
          <Message variant={"success"} icon={icon}>
            {content}
          </Message>
        </div>
        <div>
          <strong>Warning:</strong>
          <Message variant={"warning"} icon={icon}>
            {content}
          </Message>
        </div>
        <div>
          <strong>Error:</strong>
          <Message variant={"error"} icon={icon}>
            {content}
          </Message>
        </div>
      </Stack>
    </div>
  );
}
