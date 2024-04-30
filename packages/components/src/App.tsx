import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../dist/default-custom-properties.css'
//import '../dist/'
import { Button, InlineIcon, UnstyledButton2AAlt, UnstyledButton2Alt, UnstyledButtonAAltHook, UnstyledButtonAltHook } from '../'
import SvgReact from './assets/react.svg?react';

function App() {
  const [count, setCount] = useState(0)

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
        <Button onClick={() => setCount((count) => count + 1)}>
          <InlineIcon Svg={SvgReact} /> count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <UnstyledButtonAltHook
          styles={{ button: "asdf" }}
          hello="UnstyledButtonAltHook"
        >Hello world</UnstyledButtonAltHook>

        <UnstyledButtonAAltHook
          styles={{ button: "asdf" }}
          href="https://google.com"
          hello="UnstyledButtonAAltHook"
        >Hello world</UnstyledButtonAAltHook>
      </div>
      <div>
        <UnstyledButton2Alt
          styles={{ button: "asdf" }}
          hello="UnstyledButton2Alt"
        >Hello world</UnstyledButton2Alt>

        <UnstyledButton2AAlt
          styles={{ button: "asdf" }}
          href="https://google.com"
          hello="UnstyledButton2AAlt"
        >Hello world</UnstyledButton2AAlt>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
