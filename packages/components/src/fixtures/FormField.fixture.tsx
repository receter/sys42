import { useValue } from 'react-cosmos/client';
import { FormField } from "../../dist/main"

export default function FormFieldFixture() {
  const [label] = useValue('Label', { defaultValue: "This is a label" });
  const [htmlFor] = useValue('For', { defaultValue: undefined });
  return <FormField label={label} htmlFor={htmlFor}>
    {({ htmlFor }) => <div>htmlFor from context: {htmlFor}</div>}
  </FormField>
}