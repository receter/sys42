import { t as toString, u as useFixtureState, e as extendWithValue, R as React, c as createValue, i as isEqual, r as reactExports, a as isArray } from "./index-yHf_R4Sb.js";
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
function useCurrentInputValue(inputName, defaultValue) {
  const [fixtureState] = useFixtureState("inputs");
  const inputFs = fixtureState && fixtureState[inputName];
  return inputFs && inputFs.type === "standard" ? (
    // Types of fixture state values cannot be guaranteed at run time, which
    // means that tampering with the fixture state can cause runtime errors
    extendWithValue(defaultValue, inputFs.currentValue)
  ) : defaultValue;
}
function useInputFixtureState(inputName, defaultValue) {
  const [, setFixtureState] = useFixtureState("inputs");
  React.useEffect(() => {
    setFixtureState((prevFs) => {
      const inputFs = prevFs && prevFs[inputName];
      if (inputFs && inputFs.type === "standard" && fsValueExtendsBaseValue(inputFs.defaultValue, defaultValue))
        return prevFs;
      return {
        ...prevFs,
        [inputName]: {
          type: "standard",
          defaultValue: createValue(defaultValue),
          currentValue: createValue(defaultValue)
        }
      };
    });
  }, [setFixtureState, inputName, defaultValue]);
}
function fsValueExtendsBaseValue(fsValue, baseValue) {
  return isEqual(baseValue, extendWithValue(baseValue, fsValue));
}
function useSetInputValue(inputName, defaultValue) {
  const [, setFixtureState] = useFixtureState("inputs");
  return React.useCallback((stateChange) => {
    setFixtureState((prevFs) => {
      function getNewState() {
        if (typeof stateChange !== "function")
          return stateChange;
        const stateUpdater = stateChange;
        return stateUpdater(getCurrentValueFromFixtureState(prevFs, inputName, defaultValue));
      }
      return {
        ...prevFs,
        [inputName]: {
          type: "standard",
          defaultValue: createValue(defaultValue),
          currentValue: createValue(getNewState())
        }
      };
    });
  }, [setFixtureState, defaultValue, inputName]);
}
function getCurrentValueFromFixtureState(fixtureState, inputName, defaultValue) {
  const inputFs = fixtureState && fixtureState[inputName];
  return inputFs && inputFs.type === "standard" ? extendWithValue(defaultValue, inputFs.currentValue) : defaultValue;
}
function useFixtureInput(inputName, defaultValue) {
  useInputFixtureState(inputName, defaultValue);
  const currentValue = useCurrentInputValue(inputName, defaultValue);
  const setValue = useSetInputValue(inputName, defaultValue);
  return [currentValue, setValue];
}
function useValue(inputName, opts) {
  return useFixtureInput(inputName, opts.defaultValue);
}
function getDefaultSelectValue({ options, defaultValue }) {
  if (typeof defaultValue === "string") {
    return defaultValue;
  }
  const [firstOption] = options;
  if (typeof firstOption === "object") {
    return firstOption.options[0];
  }
  return firstOption;
}
function useCurrentSelectValue(selectName, args) {
  const [fixtureState] = useFixtureState("inputs");
  const inputFs = fixtureState && fixtureState[selectName];
  return inputFs && inputFs.type === "select" ? inputFs.currentValue : getDefaultSelectValue(args);
}
function useSelectFixtureState(selectName, args) {
  const [, setFixtureState] = useFixtureState("inputs");
  const defaultValue = getDefaultSelectValue(args);
  reactExports.useEffect(() => {
    setFixtureState((prevFs) => {
      const inputFs = prevFs && prevFs[selectName];
      if (inputFs && inputFs.type === "select" && inputFs.defaultValue === defaultValue)
        return prevFs;
      return {
        ...prevFs,
        [selectName]: {
          type: "select",
          options: args.options,
          defaultValue,
          currentValue: defaultValue
        }
      };
    });
  }, [JSON.stringify(args.options), defaultValue, selectName, setFixtureState]);
}
function useSetSelectValue(selectName) {
  const [, setFixtureState] = useFixtureState("inputs");
  return reactExports.useCallback((value) => {
    setFixtureState((prevFs) => {
      const inputFs = prevFs && prevFs[selectName];
      if (!inputFs || inputFs.type !== "select") {
        console.warn(`Invalid fixture state for select: ${selectName}`);
        return prevFs ?? {};
      }
      return {
        ...prevFs,
        [selectName]: {
          ...inputFs,
          currentValue: value
        }
      };
    });
  }, [selectName, setFixtureState]);
}
function useFixtureSelect(selectName, args) {
  if (!args || !args.options || !args.options.length)
    throw new Error("No options provided to useSelect");
  if (typeof args.options[0] === "object") {
    if (!args.options[0].options.length)
      throw new Error("No options provided to useSelect");
  }
  useSelectFixtureState(selectName, args);
  const currentValue = useCurrentSelectValue(selectName, args);
  const setValue = useSetSelectValue(selectName);
  return [currentValue, setValue];
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
const knownSpacingAbbreviations = [
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl"
];
function isPropsForElement(elementProps, elementType, tagName) {
  return elementType === tagName || !elementProps && elementProps;
}
function createComponent(elementType, factory) {
  return reactExports.forwardRef((props, forwardedRef) => {
    return factory({ props, forwardedRef, elementType });
  });
}
function y(...t) {
  return t.filter(Boolean).join(" ");
}
const m = y;
function o(f2) {
  return (r) => {
    f2.forEach((n2) => {
      typeof n2 == "function" ? n2(r) : n2 != null && (n2.current = r);
    });
  };
}
function useBaseButton({
  props,
  elementType,
  forwardedRef
}, interceptor) {
  const ref = reactExports.useRef(null);
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  if (isPropsForElement(draft.elementProps, elementType, "button")) {
    draft.elementProps.type = draft.elementProps.type ?? "button";
  }
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: o([forwardedRef, ref])
  };
}
const button = "_button_1ac43_1";
const button_primary = "_button_primary_1ac43_60";
const button_danger = "_button_danger_1ac43_86";
const button_lg = "_button_lg_1ac43_111";
const styles$k = {
  button,
  button_primary,
  button_danger,
  button_lg
};
function useButton(options) {
  const { variant, size, ...baseProps } = options.props;
  return useBaseButton(
    {
      ...options,
      props: baseProps
    },
    (draft) => {
      draft.elementProps.className = m(
        draft.elementProps.className,
        variant === "primary" && styles$k.button_primary,
        variant === "danger" && styles$k.button_danger,
        size === "lg" && styles$k.button_lg,
        styles$k.button
      );
    }
  );
}
const Button = createComponent(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useButton(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...elementProps, ref: elementRef });
  }
);
const ButtonA = createComponent("a", (hookOptions) => {
  const { elementProps, elementRef } = useButton(hookOptions);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { ...elementProps, ref: elementRef });
});
function useBaseCheckbox({ props, forwardedRef }, interceptor) {
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.type = "checkbox";
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const checkbox = "_checkbox_10xtx_1";
const styles$j = {
  checkbox
};
function useCheckbox(options) {
  return useBaseCheckbox(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$j.checkbox
    );
  });
}
const Checkbox = createComponent(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useCheckbox(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...elementProps, ref: elementRef });
  }
);
const CheckboxGroupContext = reactExports.createContext(void 0);
function renderCheckboxGroup(args) {
  const { children, ctx } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupContext.Provider, { value: ctx, children });
}
function useBaseCheckboxGroup({
  props,
  forwardedRef
}, interceptor) {
  const { value, onChangeValue, onChange, children, role, name, ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.role = role ?? "group";
  function handleChangeCheckbox(e) {
    onChange == null ? void 0 : onChange(e);
    if (e.target.checked && !value.includes(e.target.value)) {
      onChangeValue == null ? void 0 : onChangeValue([...value, e.target.value]);
    } else if (!e.target.checked && value.includes(e.target.value)) {
      onChangeValue == null ? void 0 : onChangeValue(value.filter((v) => v !== e.target.value));
    }
  }
  const ctx = {
    value,
    name,
    onChangeCheckbox: handleChangeCheckbox
  };
  const renderArgs = {
    ctx,
    children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
function useCheckboxGroup(options) {
  return useBaseCheckboxGroup(options);
}
const CheckboxGroup = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useCheckboxGroup(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef, children: renderCheckboxGroup(renderArgs) });
  }
);
function renderLabeledControl(args) {
  const { control, label: label2 } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    control,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: label2 })
  ] });
}
function useBaseLabeledControl({
  props,
  forwardedRef
}, interceptor) {
  const { children, control, ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  interceptor == null ? void 0 : interceptor(draft);
  const renderArgs = {
    control,
    label: children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
const labeledControl = "_labeledControl_1h0u8_1";
const styles$i = {
  labeledControl
};
function useLabeledControl(options) {
  return useBaseLabeledControl(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$i.labeledControl
    );
  });
}
const LabeledControl = createComponent(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useLabeledControl(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("label", { ...elementProps, ref: elementRef, children: renderLabeledControl(renderArgs) });
  }
);
function useBaseCheckboxGroupItem({
  props,
  forwardedRef
}, interceptor) {
  const { children, value, disabled, ...restProps } = props;
  const ctx = reactExports.useContext(CheckboxGroupContext);
  const draft = {
    elementProps: {
      ...restProps,
      children
    },
    checkboxProps: {
      value,
      disabled,
      checked: ctx == null ? void 0 : ctx.value.includes(value),
      onChange: ctx == null ? void 0 : ctx.onChangeCheckbox,
      name: ctx == null ? void 0 : ctx.name
    }
  };
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    checkboxProps: draft.checkboxProps,
    elementRef: forwardedRef
  };
}
const checkboxGroupItem = "_checkboxGroupItem_2ngu2_1";
const styles$h = {
  checkboxGroupItem
};
function useCheckboxGroupItem(options) {
  return useBaseCheckboxGroupItem(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$h.checkboxGroupItem
    );
  });
}
const CheckboxGroupItem = createComponent("label", (hookOptions) => {
  const { elementProps, elementRef, checkboxProps } = useCheckboxGroupItem(hookOptions);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LabeledControl,
    {
      ...elementProps,
      ref: elementRef,
      control: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { ...checkboxProps })
    }
  );
});
function useBaseLabel({ props, forwardedRef }, interceptor) {
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const label$1 = "_label_syi2f_1";
const styles$g = {
  label: label$1
};
function useLabel(options) {
  return useBaseLabel(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$g.label
    );
  });
}
const Label = createComponent(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef } = useLabel(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("label", { ...elementProps, ref: elementRef });
  }
);
const FormFieldContext = reactExports.createContext(
  void 0
);
function renderFormField(args) {
  const { labelProps, errorMessagesProps, children, ctx } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormFieldContext.Provider, { value: ctx, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { ...labelProps }),
    typeof children === "function" ? children(ctx) : children,
    errorMessagesProps.map((props, i) => /* @__PURE__ */ reactExports.createElement("div", { ...props, key: i }))
  ] });
}
function useBaseFormField({ props, forwardedRef }, interceptor) {
  const [uniqueFormFieldId] = reactExports.useState(() => uniqueId("sys42-form-field-"));
  const { errorMessage: errorMessage2, label: label2, htmlFor, children, ...restProps } = props;
  let errorMessageArray = [];
  if (isArray(errorMessage2)) {
    errorMessageArray = errorMessage2;
  } else if (errorMessage2) {
    errorMessageArray = [errorMessage2];
  }
  const ctx = {
    htmlFor: htmlFor || uniqueFormFieldId,
    isError: errorMessageArray.length > 0
  };
  const draft = {
    elementProps: restProps,
    labelProps: {
      htmlFor: ctx.htmlFor,
      children: label2
    },
    errorMessagesProps: errorMessageArray.map((errorMessage22) => ({
      children: errorMessage22
    }))
  };
  interceptor == null ? void 0 : interceptor(draft, ctx);
  const renderArgs = {
    labelProps: draft.labelProps,
    errorMessagesProps: draft.errorMessagesProps,
    ctx,
    children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
const formField = "_formField_16nus_1";
const errorMessage$1 = "_errorMessage_16nus_4";
const label = "_label_16nus_10";
const styles$f = {
  formField,
  errorMessage: errorMessage$1,
  label
};
function useFormField(options) {
  return useBaseFormField(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$f.formField
    );
    draft.errorMessagesProps.forEach((props) => {
      props.className = m(props.className, styles$f.errorMessage);
    });
    draft.labelProps.className = m(draft.labelProps.className, styles$f.label);
  });
}
const FormField = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useFormField(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef, children: renderFormField(renderArgs) });
  }
);
const FormFieldSetContext = reactExports.createContext(void 0);
const Legend = createComponent(
  "legend",
  (hookOptions) => {
    const { elementProps, elementRef } = useLabel(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { ...elementProps, ref: elementRef });
  }
);
function renderFormFieldSet(args) {
  const { legendProps, errorMessagesProps, children, ctx } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormFieldSetContext.Provider, { value: ctx, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { ...legendProps }),
    typeof children === "function" ? children(ctx) : children,
    errorMessagesProps.map((props, i) => /* @__PURE__ */ reactExports.createElement("div", { ...props, key: i }))
  ] });
}
function useBaseFormFieldSet({
  props,
  forwardedRef
}, interceptor) {
  const { errorMessage: errorMessage2, label: label2, children, ...restProps } = props;
  let errorMessageArray = [];
  if (isArray(errorMessage2)) {
    errorMessageArray = errorMessage2;
  } else if (errorMessage2) {
    errorMessageArray = [errorMessage2];
  }
  const ctx = {
    isError: errorMessageArray.length > 0
  };
  const draft = {
    elementProps: restProps,
    legendProps: {
      children: label2
    },
    errorMessagesProps: errorMessageArray.map((errorMessage22) => ({
      children: errorMessage22
    }))
  };
  interceptor == null ? void 0 : interceptor(draft, ctx);
  const renderArgs = {
    legendProps: draft.legendProps,
    errorMessagesProps: draft.errorMessagesProps,
    ctx,
    children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
const formFieldSet = "_formFieldSet_xdl1i_1";
const errorMessage = "_errorMessage_xdl1i_6";
const legend = "_legend_xdl1i_10";
const styles$e = {
  formFieldSet,
  errorMessage,
  legend
};
function useFormFieldSet(options) {
  return useBaseFormFieldSet(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$e.formFieldSet
    );
    draft.errorMessagesProps.forEach((props) => {
      props.className = m(props.className, styles$e.errorMessage);
    });
    draft.legendProps.className = m(
      draft.legendProps.className,
      styles$e.legend
    );
  });
}
const FormFieldSet = createComponent(
  "fieldset",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useFormFieldSet(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("fieldset", { ...elementProps, ref: elementRef, children: renderFormFieldSet(renderArgs) });
  }
);
function renderMessage(args) {
  const { children, iconProps } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    iconProps.children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...iconProps }),
    children
  ] });
}
function useBaseMessage({ props, forwardedRef }, interceptor) {
  const { icon: icon2, children, ...restProps } = props;
  const draft = {
    elementProps: restProps,
    iconProps: {
      children: icon2
    }
  };
  interceptor == null ? void 0 : interceptor(draft);
  const renderArgs = {
    iconProps: draft.iconProps,
    children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
const message = "_message_lpuk9_1";
const icon = "_icon_lpuk9_16";
const message_info = "_message_info_lpuk9_21";
const message_success = "_message_success_lpuk9_27";
const message_warning = "_message_warning_lpuk9_33";
const message_error = "_message_error_lpuk9_39";
const styles$d = {
  message,
  icon,
  message_info,
  message_success,
  message_warning,
  message_error
};
function useMessage(options) {
  const { variant, ...baseProps } = options.props;
  return useBaseMessage(
    {
      ...options,
      props: baseProps
    },
    (draft) => {
      draft.iconProps.className = m(draft.iconProps.className, styles$d.icon);
      draft.elementProps.className = m(
        draft.elementProps.className,
        variant === "info" && styles$d.message_info,
        variant === "success" && styles$d.message_success,
        variant === "warning" && styles$d.message_warning,
        variant === "error" && styles$d.message_error,
        styles$d.message
      );
    }
  );
}
const Message = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useMessage(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef, children: renderMessage(renderArgs) });
  }
);
const OverflowMenuContext = reactExports.createContext(void 0);
function renderOverflowMenu(args) {
  const { ctx, triggerProps, menuProps, triggerRef, menuRef } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(OverflowMenuContext.Provider, { value: ctx, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...triggerProps, ref: triggerRef }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...menuProps, ref: menuRef })
  ] });
}
function useBaseOverflowMenu({ props, forwardedRef }, interceptor) {
  const {
    onClose,
    onOpen,
    triggerLabel = "more",
    children,
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [menuId] = reactExports.useState(() => uniqueId("sys42-overflow-menu-"));
  const elementRef = reactExports.useRef(null);
  const triggerButtonRef = reactExports.useRef(null);
  const menuRef = reactExports.useRef(null);
  const close = reactExports.useCallback(() => {
    onClose == null ? void 0 : onClose();
    setIsOpen(false);
  }, [onClose]);
  const open = reactExports.useCallback(() => {
    onOpen == null ? void 0 : onOpen();
    setIsOpen(true);
  }, [onOpen]);
  reactExports.useEffect(() => {
    if (!isOpen) {
      return;
    }
    function handleMouseUp(e) {
      if (triggerButtonRef.current && !triggerButtonRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        close();
      }
    }
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);
  function handleClickTrigger() {
    isOpen ? close() : open();
  }
  const draft = {
    elementProps: restProps,
    triggerProps: {
      onClick: handleClickTrigger,
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      "aria-controls": menuId,
      children: triggerLabel
    },
    menuProps: {
      id: menuId,
      role: "menu",
      "aria-hidden": !isOpen,
      children
    }
  };
  const ctx = {
    isOpen,
    close,
    open,
    menuId
  };
  interceptor == null ? void 0 : interceptor(draft, ctx);
  const renderArgs = {
    ctx,
    triggerProps: draft.triggerProps,
    triggerRef: triggerButtonRef,
    menuProps: draft.menuProps,
    menuRef
  };
  return {
    elementProps: draft.elementProps,
    elementRef: o([forwardedRef, elementRef]),
    renderArgs
  };
}
const overflowMenu = "_overflowMenu_1te5t_8";
const overflowMenu_isOpen = "_overflowMenu_isOpen_1te5t_52";
const svgTriggerIcon$1 = "_svgTriggerIcon_1te5t_57";
const styles$c = {
  overflowMenu,
  overflowMenu_isOpen,
  svgTriggerIcon: svgTriggerIcon$1
};
function useOverflowMenu(options) {
  return useBaseOverflowMenu(options, (draft, ctx) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$c.overflowMenu,
      ctx.isOpen && styles$c.overflowMenu_isOpen
    );
  });
}
const OverflowMenu = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useOverflowMenu({
      ...hookOptions,
      props: {
        triggerLabel: svgTriggerIcon,
        ...hookOptions.props
      }
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef, children: renderOverflowMenu(renderArgs) });
  }
);
const svgTriggerIcon = /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: styles$c.svgTriggerIcon,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z",
        clipRule: "evenodd"
      }
    )
  }
);
function useBaseOverflowMenuItem({
  props,
  forwardedRef
}, interceptor) {
  const overflowMenuContext = reactExports.useContext(OverflowMenuContext);
  const { onClick, ...restProps } = props;
  function handleClick(e) {
    onClick == null ? void 0 : onClick(e);
    overflowMenuContext == null ? void 0 : overflowMenuContext.close();
  }
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.onClick = handleClick;
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const overflowMenuItem = "_overflowMenuItem_1ous9_1";
const styles$b = {
  overflowMenuItem
};
function useOverflowMenuItem(options) {
  return useBaseOverflowMenuItem(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$b.overflowMenuItem
    );
  });
}
const OverflowMenuItem = createComponent("button", (hookOptions) => {
  const { elementProps, elementRef } = useOverflowMenuItem(hookOptions);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...elementProps, ref: elementRef });
});
function useBaseRadio({ props, forwardedRef }, interceptor) {
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.type = "radio";
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const radio = "_radio_1hixc_1";
const styles$a = {
  radio
};
function useRadio(options) {
  return useBaseRadio(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$a.radio
    );
  });
}
const Radio = createComponent(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useRadio(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...elementProps, ref: elementRef });
  }
);
const RadioGroupContext = reactExports.createContext(void 0);
function renderRadioGroup(args) {
  const { children, ctx } = args;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupContext.Provider, { value: ctx, children });
}
function useBaseRadioGroup({ props, forwardedRef }, interceptor) {
  const { value, onChangeValue, onChange, children, role, name, ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.role = role ?? "radiogroup";
  function handleChangeRadio(e) {
    onChange == null ? void 0 : onChange(e);
    if (e.target.checked && e.target.value !== value) {
      onChangeValue == null ? void 0 : onChangeValue(e.target.value);
    }
  }
  const ctx = {
    value,
    name,
    onChangeRadio: handleChangeRadio
  };
  const renderArgs = {
    ctx,
    children
  };
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef,
    renderArgs
  };
}
function useRadioGroup(options) {
  return useBaseRadioGroup(options);
}
const RadioGroup = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef, renderArgs } = useRadioGroup(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef, children: renderRadioGroup(renderArgs) });
  }
);
function useBaseRadioGroupItem({
  props,
  forwardedRef
}, interceptor) {
  const { children, value, disabled, ...restProps } = props;
  const ctx = reactExports.useContext(RadioGroupContext);
  const draft = {
    elementProps: {
      ...restProps,
      children
    },
    radioProps: {
      value,
      disabled,
      checked: (ctx == null ? void 0 : ctx.value) === value,
      onChange: ctx == null ? void 0 : ctx.onChangeRadio,
      name: ctx == null ? void 0 : ctx.name
    }
  };
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    radioProps: draft.radioProps,
    elementRef: forwardedRef
  };
}
const radioGroupItem = "_radioGroupItem_olh7i_1";
const styles$9 = {
  radioGroupItem
};
function useRadioGroupItem(options) {
  return useBaseRadioGroupItem(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$9.radioGroupItem
    );
  });
}
const RadioGroupItem = createComponent(
  "label",
  (hookOptions) => {
    const { elementProps, elementRef, radioProps } = useRadioGroupItem(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      LabeledControl,
      {
        ...elementProps,
        ref: elementRef,
        control: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { ...radioProps })
      }
    );
  }
);
function useBaseStack({ props, forwardedRef }, interceptor) {
  const { spacing = "md", style, ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  draft.elementProps.style = reactExports.useMemo(() => {
    if (spacing) {
      let spacingValue = spacing;
      if (knownSpacingAbbreviations.includes(spacing)) {
        spacingValue = `var(--sys42-spacing-${spacing})`;
      }
      return {
        ...style,
        "--sys42-stack-spacing": spacingValue
      };
    } else {
      return style;
    }
  }, [spacing, style]);
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const stack = "_stack_1wu08_1";
const styles$8 = {
  stack
};
function useStack(options) {
  return useBaseStack(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$8.stack
    );
  });
}
const Stack = createComponent(
  "div",
  (hookOptions) => {
    const { elementProps, elementRef } = useStack(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...elementProps, ref: elementRef });
  }
);
function useBaseTextArea({ props, forwardedRef }, interceptor) {
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const textArea = "_textArea_1r8zh_1";
const styles$7 = {
  textArea
};
function useTextArea(options) {
  return useBaseTextArea(options, (draft) => {
    draft.elementProps.className = m(
      styles$7.textArea,
      draft.elementProps.className
    );
  });
}
const TextArea = createComponent(
  "textarea",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextArea(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ...elementProps, ref: elementRef });
  }
);
function useBaseTextInput({
  props,
  elementType,
  forwardedRef
}, interceptor) {
  const { type = "text", ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  if (isPropsForElement(draft.elementProps, elementType, "input")) {
    draft.elementProps.type = type;
  }
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const textInput = "_textInput_esn6q_1";
const styles$6 = {
  textInput
};
function useTextInput(options) {
  return useBaseTextInput(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      styles$6.textInput
    );
  });
}
const TextInput = createComponent(
  "input",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextInput(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...elementProps, ref: elementRef });
  }
);
function useBaseTextLink({ props, forwardedRef }, interceptor) {
  const { ...restProps } = props;
  const draft = {
    elementProps: restProps
  };
  interceptor == null ? void 0 : interceptor(draft);
  return {
    elementProps: draft.elementProps,
    elementRef: forwardedRef
  };
}
const textLinkNotAnchor = "_textLinkNotAnchor_1e0fo_11";
const styles$5 = {
  textLinkNotAnchor
};
function useTextLink(options) {
  return useBaseTextLink(options, (draft) => {
    draft.elementProps.className = m(
      draft.elementProps.className,
      options.elementType !== "a" && styles$5.textLinkNotAnchor
    );
  });
}
const TextLink = createComponent(
  "a",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { ...elementProps, ref: elementRef });
  }
);
const TextLinkButton = createComponent(
  "button",
  (hookOptions) => {
    const { elementProps, elementRef } = useTextLink(hookOptions);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...elementProps, ref: elementRef });
  }
);
const buttonGroup = "_buttonGroup_wrpto_1";
const buttonGroupReverse = "_buttonGroupReverse_wrpto_7";
const styles$4 = {
  buttonGroup,
  buttonGroupReverse
};
const classButtonGroup = styles$4.buttonGroup;
const classButtonGroupReverse = styles$4.buttonGroupReverse;
const card = "_card_861dz_1";
const styles$3 = {
  card
};
const classCard = styles$3.card;
const classContent$1 = "_classContent_1d1yq_1";
const styles$2 = {
  classContent: classContent$1
};
const classContent = styles$2.classContent;
const inlineIcon = "_inlineIcon_1muss_1";
const styles$1 = {
  inlineIcon
};
const classInlineIcon = styles$1.inlineIcon;
function Fixture$2() {
  const [textAreaValue, setTextAreaValue] = reactExports.useState("Hello, world!");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TextArea,
    {
      onChange: (e) => setTextAreaValue(e.target.value),
      value: textAreaValue
    }
  ) });
}
const fixture0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fixture$2
}, Symbol.toStringTag, { value: "Module" }));
function Fixture$1() {
  const [label2] = useValue("Label", { defaultValue: "Save" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { spacing: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "What is your name?", children: ({ htmlFor }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { id: htmlFor }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "What is your number?", children: ({ htmlFor }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { id: htmlFor, type: "tel" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classButtonGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", onClick: () => window.alert("Hi!"), children: label2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => window.alert("Hi!"), children: "Cancel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classCard, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "What is your name?", children: ({ htmlFor }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { id: htmlFor }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "What is your number?", htmlFor: "my-custom-id", children: ({ htmlFor }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { id: htmlFor, type: "tel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classButtonGroupReverse, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", onClick: () => window.alert("Hi!"), children: label2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => window.alert("Hi!"), children: "Cancel" })
      ] })
    ] }) })
  ] }) });
}
const fixture1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fixture$1
}, Symbol.toStringTag, { value: "Module" }));
function Fixture() {
  const [isEnabled] = useValue("isEnabled", { defaultValue: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "I am before" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: y(isEnabled && classContent), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "I am a heading2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "And this is a little paragraph that contains text. Nothing special here just a few words to fill this paragraph. Yeah, really, no valueable information here, stop wasting you time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "I am a heading3 with a paragraph and a list below" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is another paragraph with some text. Nothing extraordinary here, just a few words to fill this space. Seriously, no valuable information here, stop wasting your time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "First item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Second item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Third item" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is a different paragraph with some other text. Still, nothing special here, just a few words to fill this paragraph. Really, no valuable information here, you might want to move on." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "I am after" })
  ] });
}
const fixture2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fixture
}, Symbol.toStringTag, { value: "Module" }));
const SvgIconFocusLog = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 160, height: 160, viewBox: "0 0 160 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("rect", { width: 160, height: 160, rx: 30, fill: "url(#paint0_radial_101_5)" }), /* @__PURE__ */ reactExports.createElement("rect", { x: 23, y: 79.5685, width: 80, height: 80, transform: "rotate(-45 23 79.5685)", fill: "#3AFFAC" }), /* @__PURE__ */ reactExports.createElement("circle", { cx: 80, cy: 80, r: 15, fill: "black" }), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("radialGradient", { id: "paint0_radial_101_5", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(80 80) rotate(90) scale(80)" }, /* @__PURE__ */ reactExports.createElement("stop", { offset: 0.494792, stopColor: "#2797FF" }), /* @__PURE__ */ reactExports.createElement("stop", { offset: 1, stopColor: "#1B18BF" }))));
function ButtonFixture$1() {
  const [timestamp] = reactExports.useState(() => (/* @__PURE__ */ new Date()).getTime());
  const [label2] = useValue("Label", {
    defaultValue: "Hello, I look like a link"
  });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [isDisabled] = useValue("Disabled", {
    defaultValue: false
  });
  const refButton = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "TextLink" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "<TextLink>" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TextLink, { href: `#textLink-${timestamp}`, title: `Go to #${timestamp}`, children: [
      withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIconFocusLog, { className: classInlineIcon }),
      withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " " }),
      label2
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "<TextLinkButton>" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TextLinkButton,
      {
        ref: refButton,
        onClick: () => {
          alert("Button clicked");
        },
        disabled: isDisabled,
        children: [
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIconFocusLog, { className: classInlineIcon }),
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " " }),
          label2
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "<a>" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#a-${timestamp}`, children: "This is a link" })
  ] }) });
}
const fixture3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ButtonFixture$1
}, Symbol.toStringTag, { value: "Module" }));
function RadioGroupFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default"
  });
  function handleChangeValue(value) {
    setSelected(value);
  }
  function handleChange(e) {
    console.log(e);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Radio Group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        RadioGroup,
        {
          value: selected,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          "aria-label": "Choose an option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Radio Group in Field Set" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldSet, { label: "Choose an option", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        RadioGroup,
        {
          value: selected,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Radio Group with Text in Between" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        RadioGroup,
        {
          value: selected,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          "aria-label": "Choose an option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      )
    ] })
  ] });
}
const fixture4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RadioGroupFixture
}, Symbol.toStringTag, { value: "Module" }));
function RadioFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Radio,
      {
        name: "group1",
        value: "option1",
        checked: selected === "option1",
        onChange: () => setSelected("option1")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Radio,
      {
        name: "group1",
        value: "option2",
        checked: selected === "option2",
        onChange: () => setSelected("option2")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Radio,
      {
        name: "group1",
        value: "option3",
        checked: selected === "option3",
        onChange: () => setSelected("option3")
      }
    )
  ] });
}
const fixture5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RadioFixture
}, Symbol.toStringTag, { value: "Module" }));
const header = "_header_exi9a_1";
const styles = {
  header
};
function OverflowMenuFixture() {
  const refMenu = reactExports.useRef(null);
  const handleClickItem1 = () => {
    alert("Item 1 clicked");
  };
  const handleClickItem2 = () => {
    alert("Item 2 clicked");
  };
  const handleClickItem3 = () => {
    alert("Item 3 clicked");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "2rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "OverflowMenu" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Look right →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(OverflowMenu, { ref: refMenu, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem1, children: "This item is a little longer, in fact it is extremely long." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem2, children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem3, children: "Item 3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Small items →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(OverflowMenu, { ref: refMenu, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem1, children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem2, children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem3, children: "Item 3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Max-width →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenu, { ref: refMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            maxWidth: "20rem"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem1, children: "This item is a little longer, in fact it is extremely long." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem2, children: "Item 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenuItem, { onClick: handleClickItem3, children: "Item 3" })
          ]
        }
      ) })
    ] })
  ] }) });
}
const fixture6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OverflowMenuFixture
}, Symbol.toStringTag, { value: "Module" }));
function LabelFixture$1() {
  const [content] = useValue("Content", { defaultValue: "This is a message" });
  const [isIcon] = useValue("Icon", { defaultValue: false });
  const icon2 = isIcon ? "🚀" : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "1rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Default:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { icon: icon2, children: content })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Info:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { variant: "info", icon: icon2, children: content })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Success:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { variant: "success", icon: icon2, children: content })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Warning:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { variant: "warning", icon: icon2, children: content })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Error:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { variant: "error", icon: icon2, children: content })
    ] })
  ] }) });
}
const fixture7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LabelFixture$1
}, Symbol.toStringTag, { value: "Module" }));
function LabeledControlFixture() {
  const [selected, setSelected] = useFixtureSelect("Selected", {
    options: ["option1", "option2", "option3"],
    defaultValue: "default"
  });
  const refIndeterminateCheckbox = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (refIndeterminateCheckbox.current) {
      refIndeterminateCheckbox.current.indeterminate = true;
    }
  }, []);
  const [checkbox1, setCheckbox1] = useValue("Checkbox 1", {
    defaultValue: false
  });
  const [checkbox2, setCheckbox2] = useValue("Checkbox 2", {
    defaultValue: false
  });
  const [checkbox3, setCheckbox3] = useValue("Checkbox 3", {
    defaultValue: false
  });
  const [checkbox4, setCheckbox4] = useValue("Checkbox 4", {
    defaultValue: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "option1", checked: true, disabled: true }),
          children: "Hello I am a radio button label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "option1", checked: false, disabled: true }),
          children: "Hello I am a radio button label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              name: "group1",
              value: "option1",
              checked: selected === "option1",
              onChange: () => setSelected("option1")
            }
          ),
          children: "Hello I am a radio button label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              name: "group1",
              value: "option2",
              checked: selected === "option2",
              onChange: () => setSelected("option2")
            }
          ),
          children: "Hello I am a radio button label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          style: { fontSize: "2rem" },
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              name: "group1",
              value: "option3",
              checked: selected === "option3",
              onChange: () => setSelected("option3")
            }
          ),
          children: "I am big"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabeledControl, { control: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: true, disabled: true }), children: "Hello I am a checkbox label" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabeledControl, { control: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: false, disabled: true }), children: "Hello I am a checkbox label" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LabeledControl, { control: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { ref: refIndeterminateCheckbox }), children: "Hello I am a checkbox label" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: checkbox1,
              onChange: () => setCheckbox1((v) => !v)
            }
          ),
          children: "Hello I am a checkbox label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: checkbox2,
              onChange: () => setCheckbox2((v) => !v)
            }
          ),
          children: "Hello I am a checkbox label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MyLabeledCheckbox,
        {
          isChecked: checkbox3,
          onChange: () => setCheckbox3((v) => !v),
          children: "Hello I am a checkbox label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LabeledControl,
        {
          style: { fontSize: "2rem" },
          control: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: checkbox4,
              onChange: () => setCheckbox4((v) => !v)
            }
          ),
          children: "I am big"
        }
      )
    ] })
  ] });
}
function MyLabeledCheckbox({
  children,
  isChecked,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LabeledControl,
    {
      control: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: isChecked, onChange }),
      children
    }
  );
}
const fixture8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LabeledControlFixture
}, Symbol.toStringTag, { value: "Module" }));
function LabelFixture() {
  const [content] = useValue("Content", { defaultValue: "This is a label" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: content });
}
const fixture9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LabelFixture
}, Symbol.toStringTag, { value: "Module" }));
function FormFieldFixture() {
  const [label2] = useValue("Label", { defaultValue: "This is a label" });
  const [htmlFor] = useValue("For", { defaultValue: "" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FormField,
    {
      label: label2,
      htmlFor,
      errorMessage: "Hello I am an error",
      children: ({ htmlFor: htmlFor2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "htmlFor from context: ",
        htmlFor2
      ] })
    }
  );
}
const fixture10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormFieldFixture
}, Symbol.toStringTag, { value: "Module" }));
function CheckboxGroupFixture() {
  const [option1Checked, setOption1Checked] = useValue("option1", {
    defaultValue: false
  });
  const [option2Checked, setOption2Checked] = useValue("option2", {
    defaultValue: false
  });
  const [option3Checked, setOption3Checked] = useValue("option3", {
    defaultValue: false
  });
  const checkboxGroupValue = [];
  if (option1Checked) {
    checkboxGroupValue.push("option1");
  }
  if (option2Checked) {
    checkboxGroupValue.push("option2");
  }
  if (option3Checked) {
    checkboxGroupValue.push("option3");
  }
  function handleChangeValue(values) {
    setOption1Checked(values.includes("option1"));
    setOption2Checked(values.includes("option2"));
    setOption3Checked(values.includes("option3"));
  }
  function handleChange(e) {
    console.log(e);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Checkbox Group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CheckboxGroup,
        {
          value: checkboxGroupValue,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          "aria-label": "Choose an option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Checkbox Group in Field Set" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldSet, { label: "Choose an option", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CheckboxGroup,
        {
          value: checkboxGroupValue,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Checkbox Group with Text in Between" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CheckboxGroup,
        {
          value: checkboxGroupValue,
          onChangeValue: handleChangeValue,
          onChange: handleChange,
          "aria-label": "Choose an option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option2", children: "Option 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupItem, { value: "option3", children: "Option 3" })
          ]
        }
      )
    ] })
  ] });
}
const fixture11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CheckboxGroupFixture
}, Symbol.toStringTag, { value: "Module" }));
function CheckboxFixture() {
  const [checkbox1, setCheckbox1] = useValue("Checkbox 1", {
    defaultValue: false
  });
  const [checkbox2, setCheckbox2] = useValue("Checkbox 2", {
    defaultValue: false
  });
  const [checkbox3, setCheckbox3] = useValue("Checkbox 3", {
    defaultValue: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: checkbox1, onChange: () => setCheckbox1((v) => !v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: checkbox2, onChange: () => setCheckbox2((v) => !v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: checkbox3, onChange: () => setCheckbox3((v) => !v) })
  ] });
}
const fixture12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CheckboxFixture
}, Symbol.toStringTag, { value: "Module" }));
function ButtonFixture() {
  const [label2] = useValue("Label", { defaultValue: "Blick me!" });
  const [withIcon] = useValue("With icon", { defaultValue: false });
  const [variant] = useFixtureSelect("Variant", {
    options: ["default", "primary", "danger"],
    defaultValue: "default"
  });
  const [size] = useFixtureSelect("Size", {
    options: ["default", "lg"],
    defaultValue: "default"
  });
  const [isDisabled] = useValue("Disabled", { defaultValue: false });
  const refButton = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Button" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref: refButton,
        onClick: () => {
          alert("Button clicked");
        },
        size: size === "default" ? void 0 : size,
        variant: variant === "default" ? void 0 : variant,
        disabled: isDisabled,
        children: [
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIconFocusLog, { className: classInlineIcon }),
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " " }),
          label2
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "ButtonA" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ButtonA,
      {
        href: "https://github.com/receter/sys42",
        size: size === "default" ? void 0 : size,
        variant: variant === "default" ? void 0 : variant,
        title: "Go to GitHub",
        children: [
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIconFocusLog, { className: classInlineIcon }),
          withIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " " }),
          label2
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Button mania" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classButtonGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", children: "Default" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", disabled: true, children: "Default" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Default" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, children: "Default" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classButtonGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "lg", children: "Primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "lg", disabled: true, children: "Primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", children: "Primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", disabled: true, children: "Primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classButtonGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", size: "lg", children: "Danger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", size: "lg", disabled: true, children: "Danger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", children: "Danger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", disabled: true, children: "Danger" })
    ] })
  ] }) });
}
const fixture13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ButtonFixture
}, Symbol.toStringTag, { value: "Module" }));
const rendererConfig = {
  "playgroundUrl": "http://localhost:5000",
  "containerQuerySelector": null
};
const fixtures = {
  "fixtures/textArea.fixture.tsx": { module: fixture0 },
  "fixtures/simpleForm.fixture.tsx": { module: fixture1 },
  "fixtures/classContent.fixture.tsx": { module: fixture2 },
  "fixtures/TextLink.fixture.tsx": { module: fixture3 },
  "fixtures/RadioGroup.fixture.tsx": { module: fixture4 },
  "fixtures/Radio.fixture.tsx": { module: fixture5 },
  "fixtures/OverflowMenu.fixture.tsx": { module: fixture6 },
  "fixtures/Message.fixture.tsx": { module: fixture7 },
  "fixtures/LabeledControl.fixture.tsx": { module: fixture8 },
  "fixtures/Label.fixture.tsx": { module: fixture9 },
  "fixtures/FormField.fixture.tsx": { module: fixture10 },
  "fixtures/CheckboxGroup.fixture.tsx": { module: fixture11 },
  "fixtures/Checkbox.fixture.tsx": { module: fixture12 },
  "fixtures/Button.fixture.tsx": { module: fixture13 }
};
const decorators = {};
const moduleWrappers = {
  lazy: false,
  fixtures,
  decorators
};
export {
  moduleWrappers,
  rendererConfig
};
