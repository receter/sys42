import { useState } from "react";

import { TextArea } from "../lib/main";

export default function Fixture() {
  const [textAreaValue, setTextAreaValue] = useState("Hello, world!");
  return (
    <div style={{ padding: "2rem" }}>
      <TextArea
        onChange={(e) => setTextAreaValue(e.target.value)}
        value={textAreaValue}
      />
    </div>
  );
}
