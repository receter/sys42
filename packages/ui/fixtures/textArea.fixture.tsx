import { useState } from "react";

import { TextArea } from "../lib/main";

export default function Fixture() {
  const [textAreaValue, setTextAreaValue] = useState("Hello, world!");
  return (
    <div style={{ padding: "2rem" }}>
      <TextArea onValueChange={setTextAreaValue} value={textAreaValue} />
    </div>
  );
}
