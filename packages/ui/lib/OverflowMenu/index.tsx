import { forwardRef } from "react";

import { renderOverflowMenu } from "./render";
import { OverflowMenuProps, useOverflowMenu } from "./useOverflowMenu";
import {
  OverflowMenu_ItemProps,
  useOverflowMenu_Item,
} from "./useOverflowMenu_Item";

import styles from "./styles.module.css";

const OverflowMenuRoot = forwardRef<
  HTMLDivElement,
  OverflowMenuProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { elementProps, elementRef, renderArgs } = useOverflowMenu({
    props: {
      triggerLabel: svgTriggerIcon,
      ...props,
    },
    elementType: "div",
    forwardedRef,
  });
  return (
    <div {...elementProps} ref={elementRef}>
      {renderOverflowMenu(renderArgs)}
    </div>
  );
});

const OverflowMenu_Item = forwardRef<
  HTMLButtonElement,
  OverflowMenu_ItemProps<React.ComponentProps<"button">>
>((props, forwardedRef) => {
  const { elementProps, elementRef } = useOverflowMenu_Item({
    props,
    elementType: "button",
    forwardedRef,
  });

  return <button {...elementProps} ref={elementRef} />;
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
  Item: OverflowMenu_Item,
});
