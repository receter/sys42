export function concatClassNames(
  ...args: Array<string | boolean | null | undefined>
): string {
  return args.filter((item) => !!item).join(" ");
}

export function filterKeyEnter(handler: (e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handler(e);
    }
  };
}

export function filterKeyEsc(handler: (e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handler(e);
    }
  };
}

export function accessibleOnClick(
  handler: (e: React.KeyboardEvent) => void,
  tabIndex?: number
) {
  return {
    role: "button",
    tabIndex: tabIndex ?? 0,
    onKeyDown: filterKeyEnter(handler),
    onClick: handler,
  };
}
