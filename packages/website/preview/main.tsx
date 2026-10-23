/*
  The preview frame of the live examples. Each live code block embeds this
  page in an iframe and sends it the code (see
  src/components/LivePreviewFrame), so the example renders in its own
  document with only the sys42 styles, like in a consumer app.
*/
import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
import "./styles.css";

import { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { LiveContext, LivePreview, LiveProvider } from "react-live";

import {
  type HostMessage,
  postPreviewMessage,
  readPreviewMessage,
} from "../src/components/LivePreviewFrame/protocol";
import { scope } from "./scope";

type Example = { code: string; noInline: boolean };

// Like @docusaurus/theme-live-codeblock, see
// https://github.com/facebook/docusaurus/issues/9630#issuecomment-1855682643
function transformCode(code: string) {
  return `${code};`;
}

function ErrorReporter() {
  const { error } = useContext(LiveContext);
  useEffect(() => {
    postPreviewMessage(window.parent, { type: "error", error: error ?? null });
  }, [error]);
  return null;
}

function App() {
  const [example, setExample] = useState<Example | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.source !== window.parent) {
        return;
      }
      const message = readPreviewMessage<HostMessage>(event);
      if (message?.type === "render") {
        setExample({ code: message.code, noInline: message.noInline });
      }
    }

    window.addEventListener("message", handleMessage);
    postPreviewMessage(window.parent, { type: "ready" });
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!example) {
    return null;
  }

  return (
    <LiveProvider
      code={example.code}
      noInline={example.noInline}
      scope={scope}
      transformCode={transformCode}
    >
      <ErrorReporter />
      <LivePreview />
    </LiveProvider>
  );
}

/**
 * Reports the height the frame needs to the code block. Popups like menus
 * and listboxes are positioned out of the flow and can reach past the
 * content, so the lowest bottom edge of all elements counts.
 */
function measureHeight(root: HTMLElement) {
  let scheduled = 0;
  let lastHeight = -1;

  function measure() {
    scheduled = 0;
    const paddingBottom = parseFloat(getComputedStyle(root).paddingBottom);
    let bottom = root.getBoundingClientRect().bottom;
    for (const element of root.querySelectorAll("*")) {
      const rect = element.getBoundingClientRect();
      if (rect.height > 0) {
        bottom = Math.max(bottom, rect.bottom + paddingBottom);
      }
    }
    const height = Math.ceil(bottom);
    if (height !== lastHeight) {
      lastHeight = height;
      postPreviewMessage(window.parent, { type: "resize", height });
    }
  }

  function schedule() {
    if (!scheduled) {
      scheduled = requestAnimationFrame(measure);
    }
  }

  new ResizeObserver(schedule).observe(root);
  new MutationObserver(schedule).observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  window.addEventListener("transitionend", schedule);
  window.addEventListener("animationend", schedule);
}

const root = document.getElementById("root")!;
measureHeight(root);
createRoot(root).render(<App />);
