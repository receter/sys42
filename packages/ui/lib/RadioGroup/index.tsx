import {
  createContext,
  InputHTMLAttributes,
  ReactNode,
  useContext,
} from "react";
import { cn } from "@sys42/utils";

import { Sys42Props } from "../types";

import styles from "./styles.module.css";

/*

  GENERAL NOTES:

  - Something I don't like so much about this pattern is that the value prop type
    of Group and Item aren't linked. The dream would be that the enum type that is
    set to <Group value={<T>} /> would match and check the value
    prop of its children <Item value={<T>} />. Not possible as far as I'm aware.

  - I don't like so much the fact that the hook `useBaseRadioGroup` does not return
    any relevant props for the child input. I wish we could do something like this,
    although the execution is shitty:

    ```ts
      const useBaseRadioGroup = ()=>({
        groupElem,
        inputProps,
      })

      const RadioGroup = (()=>{
        let _inputProps = null;

        const Main = (props)=>{
          const { groupElem, inputProps } = useBaseRadioGroup(props);
          _inputProps = inputProps
          return groupElem;
        };
      
        Main.Item = ()=> <input {..._inputProps} />;

        return Main;
      })();
    ```

*/

// ------------------------------------------------------------------------------
// 👉 CONTEXT
// ------------------------------------------------------------------------------

type BaseRadioGroupContextProps = {
  activeValue: string;
  onChange: (value: string) => void;
};

// QUESTION: Is it really neccessary to define null first?
// The children won't render without the value being set, right?
const BaseRadioGroupContext = createContext({} as BaseRadioGroupContextProps);

// ------------------------------------------------------------------------------
// 👉 GROUP
// ------------------------------------------------------------------------------

type UseBaseRadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

function useBaseRadioGroup({
  value,
  onChange,
  children,
}: UseBaseRadioGroupProps) {
  return {
    // TODO: Should probably have the groupElem return a wrapperDiv so that it would
    // be easy to for example change the Radios into a horizontal layout? Or maybe -
    // this should be left to the consumer?
    groupElem: (
      <BaseRadioGroupContext.Provider value={{ activeValue: value, onChange }}>
        {children}
      </BaseRadioGroupContext.Provider>
    ),
  };
}

export const Group = (props: UseBaseRadioGroupProps) => {
  const { groupElem } = useBaseRadioGroup(props);
  return groupElem;
};

// ------------------------------------------------------------------------------
// 👉 ITEM
// ------------------------------------------------------------------------------

type RadioGroupItemProps = {
  value: string;
  label: string;
};

// QUESTION: In this case, we do not need to merge any label
// props as we are not exposing it to the user?
export type BaseRadioGroupItemProps = Sys42Props<
  RadioGroupItemProps,
  Partial<
    Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "readOnly" | "type">
  >
>;

function Item({
  value,
  label,
  onClick,
  className,
  ...nativeProps
}: BaseRadioGroupItemProps) {
  const { activeValue, onChange } = useContext(BaseRadioGroupContext);

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    onClick?.(e);
    onChange(value);
  }

  return (
    <label className={cn(className, styles.radio)}>
      <input
        {...nativeProps}
        readOnly
        type="radio"
        onClick={handleClick}
        checked={value === activeValue}
      />
      {label}
    </label>
  );
}

// HMMM: Wondering why I'm able to do this more simply -
// I might just need to make sure my TS is setup the same way.
export const RadioGroup = Object.assign(Group, {
  Item,
});
