import { useValue } from "react-cosmos/client";

import {
  Button,
  classButtonGroup,
  classButtonGroupReverse,
  classCard,
  FormField,
  Stack,
  TextInput,
} from "../main";

export default function Fixture() {
  const [label] = useValue("Label", { defaultValue: "Save" });
  return (
    <div>
      <Stack spacing="md">
        <FormField label="What is your name?">
          {({ htmlFor }) => <TextInput id={htmlFor} />}
        </FormField>
        <FormField label="What is your number?" htmlFor="my-custom-id">
          {({ htmlFor }) => <TextInput id={htmlFor} type="tel" />}
        </FormField>
        <div className={classButtonGroup}>
          <Button variant="primary" onPress={() => window.alert("Hi!")}>
            {label}
          </Button>
          <Button onPress={() => window.alert("Hi!")}>Cancel</Button>
        </div>
        <div className={classCard}>
          <Stack spacing="md">
            <FormField label="What is your name?">
              {({ htmlFor }) => <TextInput id={htmlFor} />}
            </FormField>
            <FormField label="What is your number?" htmlFor="my-custom-id">
              {({ htmlFor }) => <TextInput id={htmlFor} type="tel" />}
            </FormField>
            <div className={classButtonGroupReverse}>
              <Button variant="primary" onPress={() => window.alert("Hi!")}>
                {label}
              </Button>
              <Button onPress={() => window.alert("Hi!")}>Cancel</Button>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
