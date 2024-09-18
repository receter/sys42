import "@sys42/ui/base.css";
import "@sys42/ui/default-custom-properties.css";
import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, classCard, classInlineIcon } from "@sys42/ui";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className={classCard}>Hello I am a sys42 card!</div>

      <Button
        aria-busy="true"
        className="example-button"
        onClick={() => setCount((count) => count + 1)}
      >
        <img src={viteLogo} className={classInlineIcon} /> count is {count}
      </Button>

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
}

export default App;
