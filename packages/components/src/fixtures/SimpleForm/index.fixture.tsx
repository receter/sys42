import { useValue } from 'react-cosmos/client';
import { Button, FormField } from "../../.."
export default function ButtonFixture() {
  const [label] = useValue('Label', { defaultValue: "Blick me!" });
  return <div>
    <FormField label="What is your name?">
      {({ htmlFor }) => <input id={htmlFor} />}
    </FormField>
    <FormField label="What is your number?">
      {({ htmlFor }) => <input id={htmlFor} type='tel' />}
    </FormField>
    <Button onClick={() => window.alert("Hi!")}>{label}</Button>
  </div>
}