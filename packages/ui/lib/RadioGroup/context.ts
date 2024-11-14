import { createContext } from "react";

export type RadioGroupContext = {
  value: string;
  onChange: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContext | null>(null);
