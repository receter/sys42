import { useRef } from "react";
import { useFixtureSelect, useValue } from "react-cosmos/client";

import SvgIconFocusLog from "../fixtures/resources/icon-focus-log.svg?react";
import { Button, ButtonA, InlineIcon, Stack } from "../main";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [variantString] = useFixtureSelect("Variant", {
    options: ["default", "primary"],
    defaultValue: undefined,
  });
  const [isDisabled] = useValue("Disabled", { defaultValue: false });
  const variant = variantString === "default" ? undefined : variantString;
  const refButton = useRef(null);
  return (
    <>
      <Stack>
        <h1>Button</h1>
        <div>{"<Button>"}</div>
        <Button
          ref={refButton}
          onPress={() => {
            console.log("Hi!");
          }}
          variant={variant}
          isDisabled={isDisabled}
        >
          {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </Button>
        <div>{"<ButtonA>"}</div>
        <ButtonA
          href="https://github.com/receter/sys42"
          variant={variant}
          isDisabled={isDisabled}
          title="Go to GitHub"
        >
          {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </ButtonA>
      </Stack>
    </>
  );
}
