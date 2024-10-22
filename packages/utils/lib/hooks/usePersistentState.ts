import { useState, useEffect } from "react";

export function usePersistentState<Type>(
  key: string,
  initialState: Type | (() => Type),
  options: { storagePrefix?: string; storage?: Storage } = {}
): [Type, React.Dispatch<React.SetStateAction<Type>>] {
  const { storagePrefix = "use-persistent-state-", storage = localStorage } =
    options;
  const prefixedKey = storagePrefix + key;
  // read key from the specified storage if not found use default value
  const [value, setValue] = useState<Type>(() => {
    const storedValue = storage.getItem(prefixedKey);
    if (storedValue === null) {
      if (typeof initialState === "function") {
        return (initialState as () => Type)();
      } else {
        return initialState;
      }
    } else {
      return JSON.parse(storedValue);
    }
  });
  // update the specified storage when value changes
  useEffect(() => {
    storage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey, storage]);
  return [value, setValue];
}
