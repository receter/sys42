/*
  Live code blocks (```jsx live) cannot import anything, so everything they
  may use has to be in this scope. Every export of @sys42/ui (components,
  hooks, helper classes, createComponent) and `cn` from @sys42/utils are
  available by name. Importing @sys42/ui here also loads the CSS of every
  component, which is what styles the previews.
*/
import * as Sys42 from "@sys42/ui";
import { cn } from "@sys42/utils";
import React from "react";

export const scope: Record<string, unknown> = {
  React,
  ...React,
  ...Sys42,
  cn,
};
