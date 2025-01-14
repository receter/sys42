import { createComponent } from "../helpers";

import { renderFormFieldSet } from "./render";
import { FormFieldSetProps, useFormFieldSet } from "./useFormFieldSet";

export const FormFieldSet = createComponent<FormFieldSetProps, "fieldset">(
  "fieldset",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } =
      useFormFieldSet(hookOptions);
    return (
      <fieldset {...elementProps} ref={elementRef}>
        {renderFormFieldSet(renderArgs)}
      </fieldset>
    );
  },
);
