import { useFixtureSelect } from "react-cosmos/client";

import { Radio } from "../lib/main";

export default function RadioFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default",
  });
  return (
    <div>
      <Radio
        name="group1"
        value="option1"
        checked={selected === "option1"}
        onChange={() => setSelected("option1")}
      />
      <Radio
        name="group1"
        value="option2"
        checked={selected === "option2"}
        onChange={() => setSelected("option2")}
      />
      <Radio
        name="group1"
        value="option3"
        checked={selected === "option3"}
        onChange={() => setSelected("option3")}
      />
    </div>
  );
}
