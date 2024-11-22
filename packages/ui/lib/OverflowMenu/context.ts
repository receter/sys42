import { createContext } from "react";

export type OverflowMenuContextType = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

export const OverflowMenuContext = createContext<
  OverflowMenuContextType | undefined
>(undefined);
