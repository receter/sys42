import { useFixtureSelect } from "react-cosmos/client";

import { FormFieldSet, RadioGroup, RadioGroupItem, Stack } from "../lib/main";

export default function RadioGroupFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default",
  });

  function handleChangeValue(value: string) {
    setSelected(value as "option1" | "option2" | "option3");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
  }

  return (
    <Stack>
      <div>
        <h2>Radio Group</h2>
        <div>
          DOC: If the radio group is not in a fieldset, the group must be
          labeled using aria-label or aria-labelledby.
        </div>
        <RadioGroup
          value={selected}
          onChangeValue={handleChangeValue}
          onChange={handleChange}
          aria-label="Choose an option"
        >
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      </div>
      <div>
        <h2>Radio Group in Field Set</h2>
        <FormFieldSet label="Choose an option">
          <RadioGroup
            value={selected}
            onChangeValue={handleChangeValue}
            onChange={handleChange}
          >
            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
            <RadioGroupItem value="option3">Option 3</RadioGroupItem>
          </RadioGroup>
        </FormFieldSet>
      </div>
      <div>
        <h2>Radio Group with Text in Between</h2>
        <RadioGroup
          value={selected}
          onChangeValue={handleChangeValue}
          onChange={handleChange}
          aria-label="Choose an option"
        >
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <div>Text</div>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      </div>
    </Stack>
  );
}
