import { useState } from "react";

import { OverflowMenu, OverflowMenuItem, Stack } from "../lib/main";

import styles from "./overflowMenu.module.css";

// Items can be rendered by other components
function DangerZoneItems({ onDelete }: { onDelete: () => void }) {
  return (
    <>
      <OverflowMenuItem disabled>Archive (disabled)</OverflowMenuItem>
      <OverflowMenuItem onClick={onDelete}>Delete</OverflowMenuItem>
    </>
  );
}

export default function OverflowMenuFixture() {
  const [lastAction, setLastAction] = useState("none");

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>OverflowMenu</h1>
        <p>
          Last action: <output>{lastAction}</output>
        </p>

        <div className={styles.header}>
          <h2>Look right →</h2>
          <OverflowMenu>
            <OverflowMenuItem onClick={() => setLastAction("Long item")}>
              This item is a little longer, in fact it is extremely long.
            </OverflowMenuItem>
            <OverflowMenuItem onClick={() => setLastAction("Edit")}>
              Edit
            </OverflowMenuItem>
            <OverflowMenuItem onClick={() => setLastAction("Duplicate")}>
              Duplicate
            </OverflowMenuItem>
            <DangerZoneItems onDelete={() => setLastAction("Delete")} />
          </OverflowMenu>
        </div>

        <div className={styles.header}>
          <h2>Small items →</h2>
          <OverflowMenu>
            <OverflowMenuItem onClick={() => setLastAction("Item 1")}>
              Item 1
            </OverflowMenuItem>
            <OverflowMenuItem onClick={() => setLastAction("Item 2")}>
              Item 2
            </OverflowMenuItem>
            <OverflowMenuItem onClick={() => setLastAction("Item 3")}>
              Item 3
            </OverflowMenuItem>
          </OverflowMenu>
        </div>

        <div className={styles.header}>
          <h2>Max-width, custom icon and label →</h2>
          <OverflowMenu label="Options" icon={svgVerticalDots}>
            <div style={{ maxWidth: "12rem" }}>
              <OverflowMenuItem
                onClick={() => setLastAction("Wrapped long item")}
              >
                This item is wrapped in a div with a max-width.
              </OverflowMenuItem>
              <OverflowMenuItem onClick={() => setLastAction("Wrapped item")}>
                Short item
              </OverflowMenuItem>
            </div>
          </OverflowMenu>
        </div>
      </Stack>
    </div>
  );
}

const svgVerticalDots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
  </svg>
);
