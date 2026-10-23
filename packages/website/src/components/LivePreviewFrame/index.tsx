import useBaseUrl from "@docusaurus/useBaseUrl";
import { useEffect, useRef, useState } from "react";

import {
  type FrameMessage,
  postPreviewMessage,
  readPreviewMessage,
} from "./protocol";
import styles from "./styles.module.css";

type LivePreviewFrameProps = {
  code: string;
  noInline: boolean;
  onError: (error: string | null) => void;
};

/**
 * Renders a live example in an iframe with the preview page (preview/), so the
 * example has its own document with only the sys42 styles. The frame compiles
 * the code, reports compile and render errors and resizes to its content.
 */
export function LivePreviewFrame({
  code,
  noInline,
  onError,
}: LivePreviewFrameProps) {
  const src = useBaseUrl("/preview/");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  // The message listener is registered once and reads the current props.
  const latest = useRef({ code, noInline, onError });
  latest.current = { code, noInline, onError };

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const frame = frameRef.current?.contentWindow;
      if (!frame || event.source !== frame) {
        return;
      }
      const message = readPreviewMessage<FrameMessage>(event);
      switch (message?.type) {
        case "ready":
          postPreviewMessage(frame, {
            type: "render",
            code: latest.current.code,
            noInline: latest.current.noInline,
          });
          break;
        case "resize":
          setHeight(message.height);
          break;
        case "error":
          latest.current.onError(message.error);
          break;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Until the frame has loaded, this goes to its initial empty document and
  // is dropped; the frame then asks for the code with "ready".
  useEffect(() => {
    const frame = frameRef.current?.contentWindow;
    if (frame) {
      postPreviewMessage(frame, { type: "render", code, noInline });
    }
  }, [code, noInline]);

  return (
    <iframe
      ref={frameRef}
      className={styles.livePreviewFrame}
      src={src}
      title="Live example"
      loading="lazy"
      style={height === undefined ? undefined : { height }}
    />
  );
}
