import { createContext } from "react";

export type RadioGroupContextType = {
  value: string;
  name?: string;
  onChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroupContext = createContext<
  RadioGroupContextType | undefined
>(undefined);
