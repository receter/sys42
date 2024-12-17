import { useFixtureSelect, useValue } from "react-cosmos/client";

import { Checkbox, LabeledControl, Radio } from "../lib/main";

export default function LabeledControlFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default",
  });

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
      <div>
        <LabeledControl
          control={
            <Radio
              name="group1"
              value="option1"
              checked={selected === "option1"}
              onChange={() => setSelected("option1")}
            />
          }
        >
          Hello I am a radio button label
        </LabeledControl>
        <LabeledControl
          control={
            <Radio
              name="group1"
              value="option2"
              checked={selected === "option2"}
              onChange={() => setSelected("option2")}
            />
          }
        >
          Hello I am a radio button label
        </LabeledControl>
        <LabeledControl
          control={
            <Radio
              name="group1"
              value="option3"
              checked={selected === "option3"}
              onChange={() => setSelected("option3")}
            />
          }
        >
          Hello I am a radio button label
        </LabeledControl>
      </div>
      <div>
        <LabeledControl
          control={
            <Checkbox
              checked={checkbox1}
              onChange={() => setCheckbox1((v) => !v)}
            />
          }
        >
          Hello I am a checkbox label
        </LabeledControl>
        <LabeledControl
          control={
            <Checkbox
              checked={checkbox2}
              onChange={() => setCheckbox2((v) => !v)}
            />
          }
        >
          Hello I am a checkbox label
        </LabeledControl>
        {/* If using LabeledControl is too verbose, it can be wrapped in a local component */}
        <MyLabeledCheckbox
          isChecked={checkbox3}
          onChange={() => setCheckbox3((v) => !v)}
        >
          Hello I am a checkbox label
        </MyLabeledCheckbox>
      </div>
    </div>
  );
}

function MyLabeledCheckbox({
  children,
  isChecked,
  onChange,
}: {
  children: string;
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <LabeledControl
      control={<Checkbox checked={isChecked} onChange={onChange} />}
    >
      {children}
    </LabeledControl>
  );
}