import { useValue } from "react-cosmos/client";

import { RadioGroup } from "../lib/main";

export default function Fixture() {
  const [value, setValue] = useValue("Value", { defaultValue: "foo" });

  return (
    <div style={{ padding: "2rem" }}>
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Item value="foo" label="Foo" />
        <RadioGroup.Item value="bar" label="Bar" />
        <RadioGroup.Item value="baz" label="Baz" />
        <RadioGroup.Item value="qux" label="Qux" />
        <RadioGroup.Item value="quux" label="Quux" />
        <RadioGroup.Item value="corge" label="Corge" />
      </RadioGroup>
    </div>
  );
}
