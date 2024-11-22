import { createContext } from "react";

export type FormFieldContextType = {
  htmlFor: string;
  isError: boolean;
};

export const FormFieldContext = createContext<FormFieldContextType | undefined>(
  undefined,
);
