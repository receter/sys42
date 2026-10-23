/*
  Ejected from @docusaurus/theme-live-codeblock 3.10.2 and adapted.

  The editor renders a second time right after it mounts. use-editable (used
  by react-live's editor) has the editor element in its effect dependencies,
  which are still empty on the first render, so the next render sets the
  editor up again and drops the focus. With react-live's own provider that
  render happens when the code has compiled; the playground here doesn't
  compile the code (see Playground/Provider), so without it the first
  keystroke would blur the editor.
*/
import Translate from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ResetButton from "@theme/Playground/Buttons/ResetButton";
import PlaygroundHeader from "@theme/Playground/Header";
import { type ReactNode, useEffect, useReducer } from "react";
import { LiveEditor } from "react-live";

import styles from "./styles.module.css";

function Editor() {
  const [, rerender] = useReducer((count: number) => count + 1, 0);
  useEffect(rerender, []);
  return <LiveEditor className={styles.playgroundEditor} />;
}

export default function PlaygroundEditor(): ReactNode {
  const isBrowser = useIsBrowser();
  return (
    <>
      <PlaygroundHeader buttons={<ResetButton />}>
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks"
        >
          Live Editor
        </Translate>
      </PlaygroundHeader>
      {/* Remounted on hydration, otherwise the dark prism theme is not applied */}
      <Editor key={String(isBrowser)} />
    </>
  );
}
