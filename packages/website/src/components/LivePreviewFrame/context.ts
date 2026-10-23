import { createContext, useContext } from "react";

export type LiveCode = {
  /** The code as currently edited */
  code: string;
  noInline: boolean;
};

/**
 * Provided by the ejected Playground/Provider. react-live's own context only
 * has the initial code, and the code block doesn't compile the code itself.
 */
export const LiveCodeContext = createContext<LiveCode | null>(null);

export function useLiveCode(): LiveCode {
  const value = useContext(LiveCodeContext);
  if (!value) {
    throw new Error("useLiveCode must be used inside a Playground");
  }
  return value;
}
