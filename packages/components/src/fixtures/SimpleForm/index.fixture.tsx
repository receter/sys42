import { useValue } from 'react-cosmos/client';
import { Button, FormField, Input, Stack } from "../../.."
export default function ButtonFixture() {
  const [label] = useValue('Label', { defaultValue: "Blick me!" });
  return <Stack spacing="lg">
    <FormField label="What is your name?">
      {({ htmlFor }) => <Input id={htmlFor} />}
    </FormField>
    <FormField label="What is your number?">
      {({ htmlFor }) => <Input id={htmlFor} type='tel' />}
    </FormField>
    <Button onClick={() => window.alert("Hi!")}>{label}</Button>
  </Stack>
}