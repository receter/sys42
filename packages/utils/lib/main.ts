/**
 * Concatenates class names, filtering out any falsey values.
 * You can use "cn" as an alias for this function.
 *
 * @param args - The class names to concatenate.
 * @returns The concatenated class names.
 */
export function concatClassNames(
  ...args: Array<string | boolean | null | undefined>
): string {
  return args.filter((item) => !!item).join(" ");
}

/**
 * Alias for `concatClassNames`.
 */
export const cn = concatClassNames;

/**
 * Filters keyboard events to only trigger the handler when the Enter key is pressed.
 *
 * @param handler - The event handler to call when the Enter key is pressed.
 * @returns A function that filters keyboard events.
 */
export function filterKeyEnter(handler: (e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handler(e);
    }
  };
}

/**
 * Filters keyboard events to trigger the handler when either the Enter or Space key is pressed.
 *
 * @param handler - The event handler to call when the Enter or Space key is pressed.
 * @returns A function that filters keyboard events.
 */
export function filterKeyTriggerButton(
  handler: (e: React.KeyboardEvent) => void
) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handler(e);
    }
  };
}

/**
 * Filters keyboard events to only trigger the handler when the Escape key is pressed.
 *
 * @param handler - The event handler to call when the Escape key is pressed.
 * @returns A function that filters keyboard events.
 */
export function filterKeyEsc(handler: (e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handler(e);
    }
  };
}

/**
 * Provides accessibility attributes and event handlers for an JSX HTML element to be used as a button.
 *
 * @param handler - The event handler to call on click or keydown Enter/Space key.
 * @param tabIndex - The tab index for the element.
 * @returns An object containing accessibility attributes and event handlers to be spread on a JSX HTML element.
 */
export function accessibleOnClick(
  handler: (e: React.KeyboardEvent | React.MouseEvent) => void,
  tabIndex?: number
) {
  return {
    role: "button",
    tabIndex: tabIndex ?? 0,
    onKeyDown: filterKeyTriggerButton(handler),
    onClick: handler,
  };
}
