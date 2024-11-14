import { useEffect, useRef } from "react";
import { useValue } from "react-cosmos/client";

import { RadioGroup } from "../lib/main";

import styles from "./radioGroup.module.css";

export default function Fixture() {
  const [valueA, setValueA] = useValue("ValueA", { defaultValue: "foo" });
  const [valueB, setValueB] = useValue("ValueB", { defaultValue: "foo" });

  const groupRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<{ label: HTMLLabelElement; input: HTMLInputElement }>(
    null,
  );

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.style.background = "lightblue";
    }
    if (itemRef.current?.input) {
      itemRef.current.input.style.transform = "scale(2)";
    }
    if (itemRef.current?.label) {
      itemRef.current.label.style.color = "red";
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <RadioGroup ref={groupRef} value={valueA} onChange={setValueA}>
        <RadioGroup.Item
          ref={itemRef}
          title="Foo title"
          value="foo"
          label="Foo"
        />
        <RadioGroup.Item value="bar" label="Bar" />
        <RadioGroup.Item value="baz" label="Baz" />
        <RadioGroup.Item value="qux" label="Qux" />
        <RadioGroup.Item
          className={styles.radioGroupItem_special}
          value="quux"
          label="Quux"
        />
        <div
          style={{
            padding: "1rem",
            margin: "1rem 0",
            background: "black",
            color: "white",
          }}
        >
          The rain in spain falls mainly on the plain.
        </div>
        <RadioGroup.Item value="corge" label="Corge" />
      </RadioGroup>

      <RadioGroup
        className={styles.radioGroup_horizontal}
        value={valueB}
        onChange={setValueB}
      >
        <RadioGroup.Item value="foo" label="Foo" />
        <RadioGroup.Item value="bar" label="Bar" />
        <RadioGroup.Item value="corge" label="Corge" />
      </RadioGroup>
    </div>
  );
}
