import { forwardRef, HTMLAttributes } from "react";

import { RadioGroupContext } from "./context";
import { renderRadio } from "./render";
import { RadioGroupProps, useRadioGroup } from "./useRadioGroup";
import { RadioGroupItemProps, useRadioGroupItem } from "./useRadioGroupItem";

// QUESTION: Not exactly sure how to deal with the renderArgs & elementArgs here.
// How I understand it is that renderArgs == the main component & elemenArgs == the wrapper/container.
// In this case, we require two hooks, so there isn't a split between the two.

const Group = forwardRef<
  HTMLDivElement,
  RadioGroupProps<HTMLAttributes<HTMLDivElement>>
>((props, forwardedRef) => {
  const { ctx, radioGroupProps } = useRadioGroup({
    props,
    forwardedRef,
  });
  return (
    // QUESTION: Does it make sense to have a render function here?
    // My feeling is that it probably doesn't.
    <RadioGroupContext.Provider value={ctx}>
      <div {...radioGroupProps} />
    </RadioGroupContext.Provider>
  );
});

const Item = forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  (props, forwardedRef) => {
    // QUESTION: (related to above) So there is no distinction made
    // between main & wrapper elements, so I'm not sure how to handle the semantics here.
    const { label, labelProps, inputProps } = useRadioGroupItem({
      props,
      forwardedRef,
    });
    // QUESTION: How do you think we should name/handle the label/children prop?
    return renderRadio({ labelProps, inputProps, children: label });
  },
);

export const RadioGroup = Object.assign(Group, {
  Item,
});
