import { createContext } from "react";

export type FormFieldSetContextType = {
  isError: boolean;
};

export const FormFieldSetContext = createContext<
  FormFieldSetContextType | undefined
>(undefined);
