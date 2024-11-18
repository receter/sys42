import React, { forwardRef } from "react";

import { renderFormField } from "./render";
import { FormFieldProps, useFormField } from "./useFormField";

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps<React.ComponentProps<"div">>
>((props, forwardedRef) => {
  const {
    elementProps,
    elementRef,
    renderProps: renderProps,
  } = useFormField({
    props,
    elementType: "div",
    forwardedRef,
  });
  return (
    <div {...elementProps} ref={elementRef}>
      {renderFormField(renderProps)}
    </div>
  );
});

export { FormField };
