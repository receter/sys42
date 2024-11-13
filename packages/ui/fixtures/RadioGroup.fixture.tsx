import { useValue } from "react-cosmos/client";

import { RadioGroup } from "../lib/main";

export default function Fixture() {
  const [value, setValue] = useValue("Value", { defaultValue: "foo" });

  return (
    <div style={{ padding: "2rem" }}>
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Item title="Foo title" value="foo" label="Foo" />
        <RadioGroup.Item value="bar" label="Bar" />
        <RadioGroup.Item value="baz" label="Baz" />
        <RadioGroup.Item value="qux" label="Qux" />
        <RadioGroup.Item value="quux" label="Quux" />
        <div
          style={{
            padding: "1rem",
            margin: "1rem 0",
            background: "black",
            color: "white",
          }}
        >
          The rain in spain falls mainly on the plain.
        </div>
        <RadioGroup.Item value="corge" label="Corge" />
      </RadioGroup>

      <RadioGroup
        style={{
          marginTop: "2rem",
          borderColor: "red",
          flexDirection: "row", // HMMM: Not that great that we can't just easily change to horizontal layout
        }}
        value={value}
        onChange={setValue}
      >
        <RadioGroup.Item value="foo" label="Foo" />
        <RadioGroup.Item value="bar" label="Bar" />
        <RadioGroup.Item value="corge" label="Corge" />
      </RadioGroup>
    </div>
  );
}
