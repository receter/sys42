import { concatClassNames } from "@sys42/utils";
import { useValue } from "react-cosmos/client";

import { classContent } from "../lib/main";

export default function Fixture() {
  const [isEnabled] = useValue("isEnabled", { defaultValue: true });
  return (
    <div style={{ padding: "2rem" }}>
      <div>I am before</div>
      <div className={concatClassNames(isEnabled && classContent)}>
        <h2>I am a heading2</h2>
        <p>
          And this is a little paragraph that contains text. Nothing special
          here just a few words to fill this paragraph. Yeah, really, no
          valueable information here, stop wasting you time.
        </p>
        <h3>I am a heading3 with a paragraph and a list below</h3>
        <p>
          This is another paragraph with some text. Nothing extraordinary here,
          just a few words to fill this space. Seriously, no valuable
          information here, stop wasting your time.
        </p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
        <p>
          This is a different paragraph with some other text. Still, nothing
          special here, just a few words to fill this paragraph. Really, no
          valuable information here, you might want to move on.
        </p>
      </div>
      <div>I am after</div>
    </div>
  );
}
