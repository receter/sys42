import { createContext } from "react";

export type CheckboxGroupContextType = {
  value: string[];
  onChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);
