import { createContext } from "react";

export type RadioGroupContextValue = {
  value: string;
  onChange: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);
