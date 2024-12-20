import { cn } from "@sys42/utils";

import { BaseRadioProps, useBaseRadio } from "./useBaseRadio";

import styles from "./styles.module.css";

export type RadioProps = BaseRadioProps;

export function useRadio(options: UseComponentOptions<RadioProps, "input">) {
  return useBaseRadio(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.radio,
    );
  });
}
