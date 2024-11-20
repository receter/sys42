import { forwardRef, useContext } from "react";
import { cn } from "@sys42/utils";

import { OverflowMenuContext } from "./context";
import {
  BaseOverflowMenuProps,
  useBaseOverflowMenu,
} from "./useBaseOverflowMenu";

import styles from "./styles.module.css";

const OverflowMenuRoot = forwardRef<
  HTMLDivElement,
  BaseOverflowMenuProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { triggerLabel = svgTriggerIcon } = props;
  const { overflowMenuProps, overflowMenuRef, isOpen } = useBaseOverflowMenu({
    props: { ...props, triggerLabel },
    elementType: "div",
    forwardedRef,
  });
  return (
    <div
      {...overflowMenuProps}
      className={cn(styles.overflowMenu, isOpen && styles.overflowMenu_isOpen)}
      ref={overflowMenuRef}
    />
  );
});

const OverflowMenuItem = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, forwardedRef) => {
  const overflowMenuContext = useContext(OverflowMenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    props.onClick?.(e);
    overflowMenuContext?.close();
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(styles.overflowMenuItem, props.className)}
      ref={forwardedRef}
    />
  );
});

const svgTriggerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.svgTriggerIcon}
  >
    <path
      fillRule="evenodd"
      d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const OverflowMenu = Object.assign(OverflowMenuRoot, {
  Item: OverflowMenuItem,
});
