import { createComponent } from "../helpers";

import { renderOverflowMenu } from "./render";
import { OverflowMenuProps, useOverflowMenu } from "./useOverflowMenu";

import styles from "./styles.module.css";

export const OverflowMenu = createComponent<OverflowMenuProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useOverflowMenu({
      ...hookOptions,
      props: {
        triggerLabel: svgTriggerIcon,
        ...hookOptions.props,
      },
    });
    return (
      <div {...elementProps} ref={elementRef}>
        {renderOverflowMenu(renderArgs)}
      </div>
    );
  },
);

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
