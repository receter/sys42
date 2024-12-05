import { createContext } from "react";

export type FormFieldContextType = {
  htmlFor: string;
  isError: boolean;
};

// DOC: If a context in sys42 is not available it is undefined (not null)
export const FormFieldContext = createContext<FormFieldContextType | undefined>(
  undefined,
);
