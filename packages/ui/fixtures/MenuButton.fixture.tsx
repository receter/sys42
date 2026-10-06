import { useState } from "react";

import { MenuButton, MenuButtonItem, Stack } from "../lib/main";

export default function MenuButtonFixture() {
  const [lastAction, setLastAction] = useState("none");

  const items = (
    <>
      <MenuButtonItem onClick={() => setLastAction("Export as CSV")}>
        Export as CSV
      </MenuButtonItem>
      <MenuButtonItem onClick={() => setLastAction("Export as PDF")}>
        Export as PDF
      </MenuButtonItem>
      <MenuButtonItem disabled>Export as XLSX (disabled)</MenuButtonItem>
    </>
  );

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>MenuButton</h1>
        <p>
          Last action: <output>{lastAction}</output>
        </p>

        <div>
          <MenuButton label="Export">{items}</MenuButton>
        </div>

        <div>
          <MenuButton variant="primary" label="Export">
            {items}
          </MenuButton>
        </div>

        <div>
          <MenuButton variant="danger" size="lg" label="Delete">
            <MenuButtonItem onClick={() => setLastAction("Delete selected")}>
              Delete selected
            </MenuButtonItem>
            <MenuButtonItem onClick={() => setLastAction("Delete all")}>
              Delete all
            </MenuButtonItem>
          </MenuButton>
        </div>

        <div>
          <MenuButton label="Disabled" disabled>
            {items}
          </MenuButton>
        </div>
      </Stack>
    </div>
  );
}
