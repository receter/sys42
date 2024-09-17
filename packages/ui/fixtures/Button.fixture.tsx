import { useRef } from "react";
import { useFixtureSelect, useValue } from "react-cosmos/client";

import { Button, ButtonA, classInlineIcon, Stack } from "../lib/main";

import SvgIconFocusLog from "./resources/icon-focus-log.svg?react";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [variant] = useFixtureSelect("Variant", {
    options: ["default", "primary"],
    defaultValue: "default",
  });
  const [size] = useFixtureSelect("Size", {
    options: ["default", "lg"],
    defaultValue: "default",
  });
  const [isDisabled] = useValue("Disabled", { defaultValue: false });
  const [isFullWidth] = useValue("isFullWidth", { defaultValue: false });
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
          size={size === "default" ? undefined : size}
          variant={variant === "default" ? undefined : variant}
          isFullWidth={isFullWidth}
          isDisabled={isDisabled}
        >
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </Button>
        <div>{"<ButtonA>"}</div>
        <ButtonA
          href="https://github.com/receter/sys42"
          size={size === "default" ? undefined : size}
          variant={variant === "default" ? undefined : variant}
          isFullWidth={isFullWidth}
          isDisabled={isDisabled}
          title="Go to GitHub"
        >
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </ButtonA>
      </Stack>
    </>
  );
}
