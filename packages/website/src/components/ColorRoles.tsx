import inventory from "@sys42/ui/semantic-tokens.json";
import { type ReactNode } from "react";

import styles from "./ColorRoles.module.css";

type Token = { name: string; category: string; defaultValue: string };

const PREFIX = "--s42-color-";
const colorTokens = (inventory as { tokens: Token[] }).tokens.filter(
  (token) => token.category === "color",
);

function role(token: Token) {
  return token.name.slice(PREFIX.length);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Foreground tokens of a background role: `on<Role>` and `on<Role>-<modifier>`. */
function foregroundsOf(background: string) {
  const on = `on${capitalize(background)}`;
  return colorTokens.filter((token) => {
    const name = role(token);
    return name === on || name.startsWith(`${on}-`);
  });
}

/**
 * Shows every background color role of the semantic tokens with the
 * foreground tokens that are defined for it (`on<Role>`), as real samples
 * rendered with the tokens loaded by the site.
 */
export default function ColorRoles(): ReactNode {
  const backgrounds = colorTokens.filter((token) => !role(token).startsWith("on"));

  return (
    <div className={styles.roles}>
      {backgrounds.map((background) => {
        const name = role(background);
        // All onSurface* colors work on surface and surfaceBright
        const foregrounds =
          name === "surfaceBright" ? foregroundsOf("surface") : foregroundsOf(name);
        return (
          <div
            key={background.name}
            className={styles.role}
            style={{ background: `var(${background.name})` }}
          >
            <div className={styles.roleName} style={{ color: foregrounds[0] ? `var(${foregrounds[0].name})` : undefined }}>
              <code>{name}</code>
            </div>
            {foregrounds.map((foreground) => (
              <div
                key={foreground.name}
                className={styles.foreground}
                style={{ color: `var(${foreground.name})` }}
              >
                {role(foreground)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
