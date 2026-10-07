import { useState } from "react";

import { FormField, Option, Select, Stack } from "../lib/main";

export default function SelectFixture() {
  const [value, setValue] = useState("banana");
  const [values, setValues] = useState<string[]>(["apple"]);
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>Select</h1>

        <FormField label="Favorite fruit (controlled)">
          {({ htmlFor }) => (
            <Select id={htmlFor} value={value} onValueChange={setValue}>
              <Option value="apple">Apple</Option>
              <Option value="banana">Banana</Option>
              <Option value="durian" disabled>
                Durian (disabled)
              </Option>
              <optgroup label="Exotic">
                <Option value="kiwi">Kiwi</Option>
                <Option value="mango">Mango</Option>
              </optgroup>
            </Select>
          )}
        </FormField>
        <p>
          Value: <output>{value}</output>
        </p>

        <form onSubmit={handleSubmit}>
          <Stack>
            <FormField label="Uncontrolled in a form">
              {({ htmlFor }) => (
                <Select id={htmlFor} name="fruit" defaultValue="">
                  <Option value="" disabled>
                    Choose a fruit
                  </Option>
                  <Option value="apple">Apple</Option>
                  <Option value="banana">Banana</Option>
                </Select>
              )}
            </FormField>
            <div>
              <button type="submit">Submit</button>
            </div>
            <p>
              Submitted: <output>{submitted}</output>
            </p>
          </Stack>
        </form>

        <FormField label="Disabled">
          {({ htmlFor }) => (
            <Select id={htmlFor} disabled>
              <Option>Apple</Option>
            </Select>
          )}
        </FormField>

        <FormField label="Multiple (no chevron)">
          {({ htmlFor }) => (
            <Select
              id={htmlFor}
              multiple
              value={values}
              onValueChange={setValues}
            >
              <Option value="apple">Apple</Option>
              <Option value="banana">Banana</Option>
              <Option value="kiwi">Kiwi</Option>
            </Select>
          )}
        </FormField>
        <p>
          Values: <output>{values.join(", ")}</output>
        </p>
      </Stack>
    </div>
  );
}
