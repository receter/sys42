import inventory from "@sys42/ui/semantic-tokens.json";
import { type ReactNode } from "react";

import styles from "./TokenTable.module.css";

type Token = { name: string; category: string; defaultValue: string };

type TokenTableProps = {
  /** The token category (the first segment after `--s42-`), e.g. "color". */
  category?: string;
  /** Only tokens whose name starts with one of these prefixes. */
  match?: string[];
};

const tokens = (inventory as { tokens: Token[] }).tokens;

/**
 * Renders the semantic tokens of @sys42/ui from the inventory the library
 * publishes as semantic-tokens.json, so the table can never drift from
 * semantic-tokens.css. Color tokens get a swatch that resolves the token in
 * the page, so it shows the native theme as loaded by this site.
 */
export default function TokenTable({ category, match }: TokenTableProps): ReactNode {
  const rows = tokens.filter(
    (token) =>
      (!category || token.category === category) &&
      (!match || match.some((prefix) => token.name.startsWith(prefix))),
  );
  const isColor = rows.every((token) => token.category === "color");

  return (
    <table className={styles.tokenTable}>
      <thead>
        <tr>
          {isColor && <th aria-label="Swatch" />}
          <th>Token</th>
          <th>Native default</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((token) => (
          <tr key={token.name}>
            {isColor && (
              <td>
                <span
                  className={styles.swatch}
                  style={{ background: `var(${token.name})` }}
                  aria-hidden="true"
                />
              </td>
            )}
            <td>
              <code>{token.name}</code>
            </td>
            <td>
              <code>{token.defaultValue}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
