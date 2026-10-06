import { createContext } from "react";
import { UseSelectPropGetters } from "downshift";

export type ListboxContextType = {
  getItemProps: UseSelectPropGetters<string>["getItemProps"];
  // Index of each item in the items array used by downshift
  indexByValue: Map<string, number>;
  highlightedIndex: number;
  selectedValue: string | null;
};

// DOC: If a context in sys42 is not available it is undefined (not null)
export const ListboxContext = createContext<ListboxContextType | undefined>(
  undefined,
);
