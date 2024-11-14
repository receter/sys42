import { forwardRef } from "react";

import { FormFieldMarkup } from "./markup";
import { FormFieldProps, useFormField } from "./useFormField";

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const { formFieldProps, formFieldRef, markupProps } = useFormField({
    props,
    elementType: "div",
    forwardedRef,
  });
  return (
    <div {...formFieldProps} ref={formFieldRef}>
      <FormFieldMarkup {...markupProps} />
    </div>
  );
});

export { FormField };
