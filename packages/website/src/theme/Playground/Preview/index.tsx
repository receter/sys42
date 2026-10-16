/*
  Ejected from @docusaurus/theme-live-codeblock 3.10.2.

  The only change is the `s42Preview` wrapper around the live preview, which
  scopes the sys42 base styles to the example (see src/css/custom.css).
*/
import BrowserOnly from "@docusaurus/BrowserOnly";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { ErrorBoundaryErrorMessageFallback } from "@docusaurus/theme-common";
import Translate from "@docusaurus/Translate";
import PlaygroundHeader from "@theme/Playground/Header";
import { type ReactNode } from "react";
import { LiveError, LivePreview } from "react-live";

import styles from "./styles.module.css";

function Loader() {
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}

function PlaygroundLivePreview(): ReactNode {
  // No SSR for the live preview
  // See https://github.com/facebook/docusaurus/issues/5747
  return (
    <BrowserOnly fallback={<Loader />}>
      {() => (
        <>
          <ErrorBoundary
            fallback={(params) => (
              <ErrorBoundaryErrorMessageFallback {...params} />
            )}
          >
            <div className="s42Preview">
              <LivePreview />
            </div>
          </ErrorBoundary>
          <LiveError className={styles.playgroundError} />
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
