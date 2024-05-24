import { useValue } from "react-cosmos/client";

import { FormField } from "../../lib/main";

export default function FormFieldFixture() {
  const [label] = useValue("Label", { defaultValue: "This is a label" });
  const [htmlFor] = useValue("For", { defaultValue: "" });
  return (
    <FormField
      label={label}
      htmlFor={htmlFor}
      errorMessage={"Hello I am an error"}
    >
      {({ htmlFor }) => <div>htmlFor from context: {htmlFor}</div>}
    </FormField>
  );
}
