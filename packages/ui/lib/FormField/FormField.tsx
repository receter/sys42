import { createComponent } from "../helpers";

import { renderFormField } from "./render";
import { FormFieldProps, useFormField } from "./useFormField";

export const FormField = createComponent<FormFieldProps, "div">(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useFormField(hookOptions);
    return (
      <div {...elementProps} ref={elementRef}>
        {renderFormField(renderArgs)}
      </div>
    );
  },
);
