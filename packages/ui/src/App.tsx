import "./App.css";

import { useState } from "react";

import { Button, ButtonA, classInlineIcon } from "../lib/main";

import SvgReact from "./assets/react.svg?react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          className="hello"
          onClick={() => setCount((count) => count + 1)}
        >
          I have hello
          <SvgReact className={classInlineIcon} /> Count is count is {count}
        </Button>
        <Button onClick={() => setCount((count) => count + 1)}>
          <img className={classInlineIcon} src={"./vite.svg"} alt="Vite logo" />{" "}
          Count is {count}
        </Button>
        <p className="test">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <Button data-hello="asdf">Button asddf</Button>

        <ButtonA draggable={false} href="https://google.com">
          ButtonA
        </ButtonA>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
