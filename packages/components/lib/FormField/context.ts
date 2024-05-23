import { createContext } from "react";

export type FormFieldContext = {
  htmlFor: string;
  isError: boolean;
} | null;

export const FormFieldContext = createContext<FormFieldContext>(null);
