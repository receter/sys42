import { createContext, CSSProperties, ReactNode, useContext } from "react";
import { cn } from "@sys42/utils";
import { omit } from "lodash-es";

import styles from "./styles.module.css";

// ------------------------------------------------------------------------------
// 👉 CONTEXT
// ------------------------------------------------------------------------------

type BaseRadioGroupContextProps = {
  activeValue: string;
  onChange: (value: string) => void;
};

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
  return (
    <BaseRadioGroupContext.Provider value={{ activeValue: value, onChange }}>
      {children}
    </BaseRadioGroupContext.Provider>
  );
}

export const Group = ({
  id,
  className,
  style,
  ariaLabeledBy,
  ...rest
}: UseBaseRadioGroupProps & {
  id?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabeledBy?: string;
}) => {
  const groupElem = useBaseRadioGroup(rest);

  return (
    <div
      aria-labelledby={ariaLabeledBy}
      className={cn(className, styles.group)}
      id={id}
      role="radiogroup"
      style={style}
    >
      {groupElem}
    </div>
  );
};

// ------------------------------------------------------------------------------
// 👉 ITEM
// ------------------------------------------------------------------------------

type UseBaseRadioGroupItemProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  label: string;
  name?: string;
  title?: string;
  value: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

function useBaseItem(props: UseBaseRadioGroupItemProps) {
  const { activeValue, onChange } = useContext(BaseRadioGroupContext);

  function handleChange() {
    onChange(props.value);
  }

  return {
    handleChange,
    checked: props.value === activeValue,
    ...omit(props, "value"),
  };
}

function Item(props: UseBaseRadioGroupItemProps) {
  const {
    label,
    checked,
    handleChange,
    className,
    name,
    title,
    style,
    id,
    ariaDescribedBy,
    ariaLabelledBy,
  } = useBaseItem(props);

  return (
    <label
      id={id}
      className={cn(className, styles.item)}
      style={style}
      title={title}
    >
      <input
        type="radio"
        onChange={handleChange}
        checked={checked}
        aria-checked={checked}
        name={name}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      />
      {label}
    </label>
  );
}

export const RadioGroup = Object.assign(Group, {
  Item,
});
