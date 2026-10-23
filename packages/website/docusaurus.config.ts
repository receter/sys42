import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Prism sets the code background as an inline style, so it is set here and
// not in custom.css. Code blocks and the live editor sit on surfaceBright.
const codeTheme = {
  ...prismThemes.github,
  plain: {
    ...prismThemes.github.plain,
    backgroundColor: "var(--s42-color-surfaceBright)",
  },
};

const config: Config = {
  title: "System 42",
  tagline:
    "A minimal React design system built on HTML, CSS Modules and design tokens",
  favicon: "img/favicon.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
    faster: true,
  },

  // GitHub Pages: https://receter.github.io/sys42/
  url: "https://receter.github.io",
  baseUrl: "/sys42/",
  organizationName: "receter",
  projectName: "sys42",
  trailingSlash: false,

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/receter/sys42/tree/main/packages/website/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@docusaurus/theme-live-codeblock"],

  themeConfig: {
    // The sys42 tokens have no dark variants yet, so the site is light only.
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    liveCodeBlock: {
      playgroundPosition: "top",
    },
    navbar: {
      title: "System 42",
      items: [
        {
          to: "/",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/receter/sys42",
          position: "right",
          label: "GitHub",
        },
        {
          href: "https://www.npmjs.com/package/@sys42/ui",
          position: "right",
          label: "npm",
        },
        { href: "pathname:///cosmos/", position: "right", label: "Cosmos" },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting started", to: "/getting-started" },
            { label: "Components", to: "/components/button" },
            { label: "Design tokens", to: "/tokens/overview" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Cosmos showcase", href: "pathname:///cosmos/" },
            { label: "GitHub", href: "https://github.com/receter/sys42" },
            {
              label: "@sys42/ui on npm",
              href: "https://www.npmjs.com/package/@sys42/ui",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andreas Riedmüller. MIT licensed.`,
    },
    prism: {
      theme: codeTheme,
      darkTheme: codeTheme,
      additionalLanguages: ["css", "bash", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
