import { useRef } from "react";
import { useFixtureSelect, useValue } from "react-cosmos/client";

import { Button, InlineIcon } from "../..";

import SvgIconFocusLog from "./resources/icon-focus-log.svg?react";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [variantString] = useFixtureSelect("Variant", {
    options: ["default", "primary"],
    defaultValue: undefined,
  });
  const variant = variantString === "default" ? undefined : variantString;
  const refButton = useRef(null);
  return (
    <Button
      ref={refButton}
      onClick={() => window.alert("Hi!")}
      variant={variant}
    >
      {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
      {withIcon && <>&nbsp;</>}
      {label}
    </Button>
  );
}
