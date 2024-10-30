import { createContext } from "react";

type OverflowMenuContextType = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

export const OverflowMenuContext =
  createContext<OverflowMenuContextType | null>(null);
