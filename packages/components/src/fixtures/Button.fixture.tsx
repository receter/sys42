import { useValue } from "react-cosmos/client";
import { Button, InlineIcon } from "../..";
import { useRef } from "react";
import SvgIconFocusLog from "./resources/icon-focus-log.svg?react";

export default function ButtonFixture() {
  const [label] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const refButton = useRef(null);
  return (
    <Button ref={refButton} onClick={() => window.alert("Hi!")}>
      {withIcon && <InlineIcon Icon={SvgIconFocusLog} />}
      {withIcon && <>&nbsp;</>}
      {label}
    </Button>
  );
}
