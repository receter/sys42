import { useValue } from "react-cosmos/client";

import { Button, FormField, Stack, TextInput } from "../main";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  return (
    <Stack spacing="md">
      <FormField label="What is your name?">
        {({ htmlFor }) => <TextInput id={htmlFor} />}
      </FormField>
      <FormField label="What is your number?" htmlFor="my-custom-id">
        {({ htmlFor }) => <TextInput id={htmlFor} type="tel" />}
      </FormField>
      <Button onClick={() => window.alert("Hi!")}>{label}</Button>
    </Stack>
  );
}
