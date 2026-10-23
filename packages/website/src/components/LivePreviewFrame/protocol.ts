/*
  Messages between a live code block and its preview frame (preview/), the
  separate page that renders the example in its own document. Both are served
  from the same origin, and every message carries `source` so other
  postMessage traffic on the page is ignored.
*/

const SOURCE = "s42-preview";

/** Sent by the code block to its frame. */
export type HostMessage = { type: "render"; code: string; noInline: boolean };

/** Sent by the frame to its code block. */
export type FrameMessage =
  | { type: "ready" }
  | { type: "resize"; height: number }
  | { type: "error"; error: string | null };

export function postPreviewMessage(
  target: Window,
  message: HostMessage | FrameMessage,
) {
  target.postMessage({ source: SOURCE, ...message }, window.location.origin);
}

/** Returns the message if the event is a preview message from the same origin. */
export function readPreviewMessage<T extends HostMessage | FrameMessage>(
  event: MessageEvent,
): T | null {
  const data: unknown = event.data;
  if (
    event.origin !== window.location.origin ||
    typeof data !== "object" ||
    data === null ||
    (data as { source?: unknown }).source !== SOURCE
  ) {
    return null;
  }
  return data as T;
}
