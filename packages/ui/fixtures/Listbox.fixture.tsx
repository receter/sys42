import { useState } from "react";

import { FormField, Listbox, ListboxItem, Stack } from "../lib/main";

const fruits = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "banana", label: "Banana", icon: "🍌" },
  { value: "blueberry", label: "Blueberry", icon: "🫐" },
  { value: "cherry", label: "Cherry", icon: "🍒" },
  { value: "grape", label: "Grape", icon: "🍇" },
  { value: "kiwi", label: "Kiwi", icon: "🥝" },
  { value: "mango", label: "Mango", icon: "🥭" },
];

export default function ListboxFixture() {
  const [value, setValue] = useState<string | null>("banana");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>Listbox</h1>

        <FormField label="Favorite fruit (controlled, rich content)">
          {({ htmlFor }) => (
            <Listbox
              id={htmlFor}
              value={value}
              onValueChange={setValue}
              placeholder="Choose a fruit"
            >
              {fruits.map((fruit) => (
                <ListboxItem
                  key={fruit.value}
                  value={fruit.value}
                  textValue={fruit.label}
                >
                  {fruit.icon} {fruit.label}
                </ListboxItem>
              ))}
            </Listbox>
          )}
        </FormField>
        <p>
          Value: <output>{String(value)}</output>
        </p>

        <form onSubmit={handleSubmit}>
          <Stack>
            <FormField label="Uncontrolled in a form">
              {({ htmlFor }) => (
                <Listbox id={htmlFor} name="fruit" placeholder="Choose a fruit">
                  <ListboxItem value="apple">Apple</ListboxItem>
                  <ListboxItem value="banana">Banana</ListboxItem>
                  <ListboxItem value="durian" disabled>
                    Durian (disabled)
                  </ListboxItem>
                  <>
                    <ListboxItem value="kiwi">Kiwi (in a fragment)</ListboxItem>
                    <ListboxItem value="mango">
                      Mango (in a fragment)
                    </ListboxItem>
                  </>
                </Listbox>
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

        <div>
          <Listbox aria-label="Standalone with aria-label" defaultValue="kiwi">
            <ListboxItem value="apple">Apple</ListboxItem>
            <ListboxItem value="kiwi">Kiwi</ListboxItem>
          </Listbox>
        </div>

        <div>
          <Listbox aria-label="Disabled" placeholder="Disabled" disabled>
            <ListboxItem value="apple">Apple</ListboxItem>
          </Listbox>
        </div>
      </Stack>
    </div>
  );
}
