import { useValue } from "react-cosmos/client";

import { Label } from "../lib/main";

export default function LabelFixture() {
  const [content] = useValue("Content", { defaultValue: "This is a label" });
  return <Label>{content}</Label>;
}
