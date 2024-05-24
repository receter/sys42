import { useRef } from "react";
import { useFixtureSelect, useValue } from "react-cosmos/client";

import { Button, ButtonA, InlineIcon } from "../..";

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
    <>
      <div>
        <h1>Button</h1>
        <div>{"<Button>"}</div>
        <Button
          ref={refButton}
          onClick={() => {
            console.log("Hi!");
          }}
          variant={variant}
        >
          {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </Button>
        <div>{"<ButtonA>"}</div>
        <ButtonA href="https://github.com/receter/sys42" variant={variant}>
          {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </ButtonA>
      </div>
    </>
  );
}
