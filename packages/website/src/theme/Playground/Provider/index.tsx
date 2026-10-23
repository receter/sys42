/*
  Ejected from @docusaurus/theme-live-codeblock 3.10.2 and adapted.

  The examples are compiled and rendered in the preview frame (preview/), not
  here, so react-live's LiveProvider is replaced by a plain LiveContext for the
  editor. The edited code goes to the preview through LiveCodeContext.
*/
import { usePrismTheme } from "@docusaurus/theme-common";
import { PlaygroundProvider as PlaygroundProviderComponent } from "@docusaurus/theme-live-codeblock/client";
import { LiveCodeContext } from "@site/src/components/LivePreviewFrame/context";
import type { Props } from "@theme/Playground/Provider";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { LiveContext } from "react-live";

function LiveProviderComponent({
  code: initialCode = "",
  language = "tsx",
  disabled = false,
  metastring,
  children,
}: Props & { metastring?: string }) {
  const prismTheme = usePrismTheme();
  const noInline = metastring?.includes("noInline") ?? false;
  const [editorCode] = useState(() => initialCode.replace(/\n$/, ""));
  const [code, setCode] = useState(editorCode);

  // The editor only reads `code` initially, like with react-live's provider.
  const liveValue = useMemo(
    () => ({
      code: editorCode,
      language,
      theme: prismTheme,
      disabled,
      onChange: setCode,
      onError() {},
    }),
    [editorCode, language, prismTheme, disabled],
  );
  const liveCode = useMemo(() => ({ code, noInline }), [code, noInline]);

  return (
    <LiveContext.Provider value={liveValue}>
      <LiveCodeContext.Provider value={liveCode}>
        {children}
      </LiveCodeContext.Provider>
    </LiveContext.Provider>
  );
}

export default function PlaygroundProvider(props: Props): ReactNode {
  const [resetKey, setResetKey] = useState(0);
  const reset = useCallback(() => setResetKey((prev) => prev + 1), []);
  const value = useMemo(() => ({ reset }), [reset]);
  return (
    <PlaygroundProviderComponent key={resetKey} value={value}>
      <LiveProviderComponent {...props} />
    </PlaygroundProviderComponent>
  );
}
