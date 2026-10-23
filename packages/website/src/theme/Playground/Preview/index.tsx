/*
  Ejected from @docusaurus/theme-live-codeblock 3.10.2 and adapted.

  The example is rendered in an iframe (LivePreviewFrame), so it has its own
  document and the docs styles don't reach it. Errors are reported by the
  frame and shown here.
*/
import BrowserOnly from "@docusaurus/BrowserOnly";
import Translate from "@docusaurus/Translate";
import { useLiveCode } from "@site/src/components/LivePreviewFrame/context";
import { LivePreviewFrame } from "@site/src/components/LivePreviewFrame";
import PlaygroundHeader from "@theme/Playground/Header";
import { type ReactNode, useState } from "react";

import styles from "./styles.module.css";

function Loader() {
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}

function PlaygroundLivePreview(): ReactNode {
  const { code, noInline } = useLiveCode();
  const [error, setError] = useState<string | null>(null);

  // No SSR for the live preview
  // See https://github.com/facebook/docusaurus/issues/5747
  return (
    <BrowserOnly fallback={<Loader />}>
      {() => (
        <>
          <LivePreviewFrame
            code={code}
            noInline={noInline}
            onError={setError}
          />
          {error && <pre className={styles.playgroundError}>{error}</pre>}
        </>
      )}
    </BrowserOnly>
  );
}

export default function PlaygroundPreview(): ReactNode {
  return (
    <>
      <PlaygroundHeader>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Result
        </Translate>
      </PlaygroundHeader>
      <div className={styles.playgroundPreview}>
        <PlaygroundLivePreview />
      </div>
    </>
  );
}
