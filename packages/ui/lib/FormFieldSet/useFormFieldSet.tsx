import { cn } from "@sys42/utils";

import {
  BaseFormFieldSetProps,
  useBaseFormFieldSet,
} from "./useBaseFormFieldSet";

import styles from "./styles.module.css";

export type FormFieldSetProps = BaseFormFieldSetProps;

export function useFormFieldSet(
  options: UseComponentOptions<FormFieldSetProps, "fieldset">,
) {
  return useBaseFormFieldSet(options, (draft) => {
    draft.elementProps.className = cn(
      draft.elementProps.className,
      styles.formFieldSet,
    );

    draft.errorMessagesProps.forEach((props) => {
      props.className = cn(props.className, styles.errorMessage);
    });

    draft.legendProps.className = cn(
      draft.legendProps.className,
      styles.legend,
    );
  });
}
