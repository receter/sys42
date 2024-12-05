import { createContext } from "react";

export type OverflowMenuContextType = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  menuId: string;
};

export const OverflowMenuContext = createContext<
  OverflowMenuContextType | undefined
>(undefined);
