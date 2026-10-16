import { type ReactNode, useEffect, useState } from "react";

import styles from "./PrimitiveScale.module.css";

type PrimitiveScaleProps = {
  /** Primitive token names, e.g. ["--space-2xs", "--space-xs"]. */
  tokens: string[];
  /** How to visualize the value: a bar of that length, a box with that radius, or nothing. */
  preview?: "length" | "radius" | "shadow" | "fontSize" | "fontWeight" | "borderWidth";
};

/**
 * Lists primitive tokens with the values they resolve to in this page. The
 * values are read from the loaded primitive-tokens.css of @sys42/ui, so they
 * are always those of the installed version.
 */
export default function PrimitiveScale({ tokens, preview }: PrimitiveScaleProps): ReactNode {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const name of tokens) {
      next[name] = computed.getPropertyValue(name).trim();
    }
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens.join(",")]);

  return (
    <table className={styles.scale}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          {preview && <th aria-label="Preview" />}
        </tr>
      </thead>
      <tbody>
        {tokens.map((name) => (
          <tr key={name}>
            <td>
              <code>{name}</code>
            </td>
            <td>
              <code>{values[name]}</code>
            </td>
            {preview && (
              <td className={styles.previewCell}>
                <Preview name={name} kind={preview} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Preview({ name, kind }: { name: string; kind: NonNullable<PrimitiveScaleProps["preview"]> }) {
  const value = `var(${name})`;
  switch (kind) {
    case "length":
      return <span className={styles.bar} style={{ width: value }} />;
    case "radius":
      return <span className={styles.box} style={{ borderRadius: value }} />;
    case "shadow":
      return <span className={styles.box} style={{ boxShadow: value, background: "var(--s42-color-surfaceBright)" }} />;
    case "borderWidth":
      return <span className={styles.box} style={{ borderWidth: value, background: "transparent" }} />;
    case "fontSize":
      return <span style={{ fontSize: value, lineHeight: 1 }}>Aa</span>;
    case "fontWeight":
      return <span style={{ fontWeight: value }}>Aa</span>;
  }
}
