import { useValue } from "react-cosmos/client";

import {
  CheckboxGroup,
  CheckboxGroupItem,
  FormFieldSet,
  Stack,
} from "../lib/main";

export default function CheckboxGroupFixture() {
  const [option1Checked, setOption1Checked] = useValue("option1", {
    defaultValue: false,
  });
  const [option2Checked, setOption2Checked] = useValue("option2", {
    defaultValue: false,
  });
  const [option3Checked, setOption3Checked] = useValue("option3", {
    defaultValue: false,
  });

  const checkboxGroupValue: string[] = [];
  if (option1Checked) {
    checkboxGroupValue.push("option1");
  }
  if (option2Checked) {
    checkboxGroupValue.push("option2");
  }
  if (option3Checked) {
    checkboxGroupValue.push("option3");
  }

  function handleChangeValue(values: string[]) {
    setOption1Checked(values.includes("option1"));
    setOption2Checked(values.includes("option2"));
    setOption3Checked(values.includes("option3"));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
  }

  return (
    <Stack>
      <div>
        <h2>Checkbox Group</h2>
        <div>
          DOC: If the checkbox group is not in a fieldset, the group should be
          labeled using aria-label or aria-labelledby.
        </div>
        <CheckboxGroup
          value={checkboxGroupValue}
          onChangeValue={handleChangeValue}
          onChange={handleChange}
          aria-label="Choose an option"
        >
          <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
          <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
          <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
        </CheckboxGroup>
      </div>
      <div>
        <h2>Checkbox Group in Field Set</h2>
        <FormFieldSet label="Choose an option">
          <CheckboxGroup
            value={checkboxGroupValue}
            onChangeValue={handleChangeValue}
            onChange={handleChange}
          >
            <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
          </CheckboxGroup>
        </FormFieldSet>
      </div>
      <div>
        <h2>Checkbox Group with Text in Between</h2>
        <CheckboxGroup
          value={checkboxGroupValue}
          onChangeValue={handleChangeValue}
          onChange={handleChange}
          aria-label="Choose an option"
        >
          <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
          <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
          <div>Text</div>
          <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
        </CheckboxGroup>
      </div>
    </Stack>
  );
}
