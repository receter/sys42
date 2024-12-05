import { useRef, useState } from "react";
import { useValue } from "react-cosmos/client";

import { classInlineIcon, Stack, TextLink, TextLinkButton } from "../lib/main";

import SvgIconFocusLog from "./resources/icon-focus-log.svg?react";

export default function ButtonFixture() {
  const [timestamp] = useState(() => new Date().getTime());
  const [label] = useValue("Label", {
    defaultValue: "Hello, I look like a link",
  });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [isDisabled] = useValue("Disabled", {
    defaultValue: false,
  });
  const refButton = useRef(null);
  return (
    <>
      <Stack>
        <h1>TextLink</h1>

        <div>{"<TextLink>"}</div>
        <TextLink href={`#textLink-${timestamp}`} title={`Go to #${timestamp}`}>
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </TextLink>

        <div>{"<TextLinkButton>"}</div>
        <TextLinkButton
          ref={refButton}
          onClick={() => {
            alert("Button clicked");
          }}
          disabled={isDisabled}
        >
          {withIcon && <SvgIconFocusLog className={classInlineIcon} />}
          {withIcon && <>&nbsp;</>}
          {label}
        </TextLinkButton>

        <div>{"<a>"}</div>
        <a href={`#a-${timestamp}`}>This is a link</a>
      </Stack>
    </>
  );
}
