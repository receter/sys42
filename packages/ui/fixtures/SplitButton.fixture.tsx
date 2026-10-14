import { useState } from "react";

import { SplitButton, SplitButtonItem, Stack } from "../lib/main";

export default function SplitButtonFixture() {
  const [lastAction, setLastAction] = useState("none");

  const items = (
    <>
      <SplitButtonItem onClick={() => setLastAction("Save as draft")}>
        Save as draft
      </SplitButtonItem>
      <SplitButtonItem onClick={() => setLastAction("Save and publish")}>
        Save and publish
      </SplitButtonItem>
      <SplitButtonItem disabled>Schedule (disabled)</SplitButtonItem>
    </>
  );

  return (
    <div style={{ padding: "2rem" }}>
      <Stack>
        <h1>SplitButton</h1>
        <p>
          Last action: <output>{lastAction}</output>
        </p>

        <div>
          <SplitButton label="Save" onClick={() => setLastAction("Save")}>
            {items}
          </SplitButton>
        </div>

        <div>
          <SplitButton
            variant="accent"
            label="Save"
            onClick={() => setLastAction("Save (accent)")}
          >
            {items}
          </SplitButton>
        </div>

        <div>
          <SplitButton
            variant="highlight"
            label="Save"
            onClick={() => setLastAction("Save (highlight)")}
          >
            {items}
          </SplitButton>
        </div>

        <div>
          <SplitButton
            variant="danger"
            size="lg"
            label="Move to trash"
            onClick={() => setLastAction("Move to trash")}
          >
            <SplitButtonItem onClick={() => setLastAction("Delete forever")}>
              Delete forever
            </SplitButtonItem>
          </SplitButton>
        </div>

        <div>
          <SplitButton label="Disabled" disabled>
            {items}
          </SplitButton>
        </div>
      </Stack>
    </div>
  );
}
