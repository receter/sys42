import { useValue } from "react-cosmos/client";

import { Checkbox } from "../lib/main";

export default function CheckboxFixture() {
  const [checkbox1, setCheckbox1] = useValue("Checkbox 1", {
    defaultValue: false,
  });
  const [checkbox2, setCheckbox2] = useValue("Checkbox 2", {
    defaultValue: false,
  });
  const [checkbox3, setCheckbox3] = useValue("Checkbox 3", {
    defaultValue: false,
  });
  return (
    <div>
      <Checkbox checked={checkbox1} onChange={() => setCheckbox1((v) => !v)} />
      <Checkbox checked={checkbox2} onChange={() => setCheckbox2((v) => !v)} />
      <Checkbox checked={checkbox3} onChange={() => setCheckbox3((v) => !v)} />
    </div>
  );
}
