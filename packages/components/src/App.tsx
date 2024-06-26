import "./App.css";
import "../dist/default-custom-properties.css";

import { useRef, useState } from "react";

import { Button, ButtonA, InlineIcon } from "../lib/main";

import SvgReact from "./assets/react.svg?react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const refIconSvg = useRef<React.ElementRef<"svg">>(null);
  const refIconImg = useRef<React.ElementRef<"img">>(null);

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
        <Button onPress={() => setCount((count) => count + 1)}>
          <InlineIcon
            ref={refIconSvg}
            Icon={SvgReact}
            preserveAspectRatio="sdf"
          />{" "}
          count is {count}
        </Button>
        <Button onPress={() => setCount((count) => count + 1)}>
          <InlineIcon
            ref={refIconImg}
            Icon={"img"}
            src={"./vite.svg"}
            alt="React logo"
          />{" "}
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <Button>Button</Button>

        <ButtonA href="https://google.com">ButtonA</ButtonA>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
