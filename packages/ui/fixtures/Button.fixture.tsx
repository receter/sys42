import { useRef } from "react";
import { useFixtureSelect, useValue } from "react-cosmos/client";

import {
  Button,
  ButtonA,
  classButtonGroup,
  classInlineIcon,
  Stack,
} from "../lib/main";

import SvgIconFocusLog from "./resources/icon-focus-log.svg?react";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [variant] = useFixtureSelect("Variant", {
    options: ["default", "primary", "danger"],
    defaultValue: "default",
  });
  const [size] = useFixtureSelect("Size", {
    options: ["default", "lg"],
    defaultValue: "default",
  });
  const [isDisabled] = useValue("Disabled", { defaultValue: false });
  const refButton = useRef(null);
  return (
    <>
      <Stack>
        <h2>Button</h2>
        <Button
          ref={refButton}
          onClick={() => {
            alert("Button clicked");
          }}
          size={size === "default" ? undefined : size}
          variant={variant === "default" ? undefined : variant}
          disabled={isDisabled}
        >
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </Button>
        <h2>ButtonA</h2>
        <ButtonA
          href="https://github.com/receter/sys42"
          size={size === "default" ? undefined : size}
          variant={variant === "default" ? undefined : variant}
          title="Go to GitHub"
        >
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </ButtonA>
        <h2>Button mania</h2>
        <div className={classButtonGroup}>
          <Button size="lg">Default</Button>
          <Button size="lg" disabled>
            Default
          </Button>
          <Button>Default</Button>
          <Button disabled>Default</Button>
        </div>
        <div className={classButtonGroup}>
          <Button variant="primary" size="lg">
            Primary
          </Button>
          <Button variant="primary" size="lg" disabled>
            Primary
          </Button>
          <Button variant="primary">Primary</Button>
          <Button variant="primary" disabled>
            Primary
          </Button>
        </div>
        <div className={classButtonGroup}>
          <Button variant="danger" size="lg">
            Danger
          </Button>
          <Button variant="danger" size="lg" disabled>
            Danger
          </Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger" disabled>
            Danger
          </Button>
        </div>
      </Stack>
    </>
  );
}
