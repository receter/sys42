import { forwardRef, HTMLAttributes } from "react";

import { renderRadioGroup, renderRadioItem } from "./render";
import { RadioGroupProps, useRadioGroup } from "./useRadioGroup";
import { RadioGroupItemProps, useRadioGroupItem } from "./useRadioGroupItem";

/*

  A: BASE HOOK

    - Functionality: Implement bespoke functionality by extending vanilla Elements.
    - Interface: Define an interface which is as element-agnostic as possible.
      Consists of a ref, and `Props`, which is an extension or custom implementation
      of vanilla Element(s).

  B: HOOK

    - Extends the [HOOK::BASE] by injecting styles.

  C: RENDER_FUNCTION

    - Connects a HOOK to Element(s).
    - Elements can be of type:
      1. `Context`: ReactContext Provider.
      2. `Element`: Wrapper element nested within the context provider.
      3. `<Custom>`: `Main` element(s) that are the primary focus of the component.
    - Props reflect this pattern, for example:

      const renderArgs = {
        ctx: {}, // Context
        elementProps: {}, // Wrapper
        inputProps: {}, // Custom
      };


  D: COMPONENT (MAIN EXPORT)

    - Connects HOOKs to RENDER_FUNCTIONs.

*/

const Group = forwardRef<
  HTMLDivElement,
  RadioGroupProps<HTMLAttributes<HTMLDivElement>>
>((props, forwardedRef) => {
  const renderArgs = useRadioGroup({
    props,
    forwardedRef,
  });
  return renderRadioGroup(renderArgs);
});

const Item = forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  (props, forwardedRef) => {
    const renderArgs = useRadioGroupItem({
      props,
      forwardedRef,
    });
    return renderRadioItem(renderArgs);
  },
);

export const RadioGroup = Object.assign(Group, {
  Item,
});
