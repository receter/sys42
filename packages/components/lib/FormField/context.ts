import { createContext } from "react";

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
};

export const FormFieldContext = createContext<FormFieldContext | null>(null);
