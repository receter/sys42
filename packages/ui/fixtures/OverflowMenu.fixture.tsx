import { useRef } from "react";

import { OverflowMenu, OverflowMenuItem, Stack } from "../lib/main";

import styles from "./overflowMenu.module.css";

export default function OverflowMenuFixture() {
  const refMenu = useRef(null);

  const handleClickItem1 = () => {
    alert("Item 1 clicked");
  };

  const handleClickItem2 = () => {
    alert("Item 2 clicked");
  };

  const handleClickItem3 = () => {
    alert("Item 3 clicked");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>OverflowMenu</h1>

        <div className={styles.header}>
          <h2>Look right →</h2>
          <OverflowMenu ref={refMenu}>
            <OverflowMenuItem onClick={handleClickItem1}>
              This item is a little longer, in fact it is extremely long.
            </OverflowMenuItem>
            <OverflowMenuItem onClick={handleClickItem2}>
              Item 2
            </OverflowMenuItem>
            <OverflowMenuItem onClick={handleClickItem3}>
              Item 3
            </OverflowMenuItem>
          </OverflowMenu>
        </div>
        <div className={styles.header}>
          <h2>Small items →</h2>
          <OverflowMenu ref={refMenu}>
            <OverflowMenuItem onClick={handleClickItem1}>
              Item 1
            </OverflowMenuItem>
            <OverflowMenuItem onClick={handleClickItem2}>
              Item 2
            </OverflowMenuItem>
            <OverflowMenuItem onClick={handleClickItem3}>
              Item 3
            </OverflowMenuItem>
          </OverflowMenu>
        </div>

        <div className={styles.header}>
          <h2>Max-width →</h2>
          <OverflowMenu ref={refMenu}>
            <div
              style={{
                maxWidth: "20rem",
              }}
            >
              <OverflowMenuItem onClick={handleClickItem1}>
                This item is a little longer, in fact it is extremely long.
              </OverflowMenuItem>
              <OverflowMenuItem onClick={handleClickItem2}>
                Item 2
              </OverflowMenuItem>
              <OverflowMenuItem onClick={handleClickItem3}>
                Item 3
              </OverflowMenuItem>
            </div>
          </OverflowMenu>
        </div>
      </Stack>
    </div>
  );
}
