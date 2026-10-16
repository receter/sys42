---
sidebar_position: 4
---

# Props and event handlers

Components that replace an HTML element are drop-in replacements and accept all props of that element. Some share its name (`Button` for `<button>`, `Label` for `<label>`), others are named after what they are (`TextInput` for `<input type="text">`).

Native props keep their native behavior. In particular, `onChange` always receives the original event, just like on the HTML element. A component never changes the signature of a native handler.

## `onValueChange`

For convenience, components that hold a value also accept `onValueChange`, which receives the new value directly:

- If the change comes from an HTML element, `onValueChange` is called with `(value, event)`, where `event` is the original event. `onChange` is still called as usual, before `onValueChange`.
- If there is no HTML element that changes the value, as with custom widgets like `Listbox`, `onValueChange` is called with `(value)` only.

| Component | `onChange(event)` | `onValueChange` |
| --- | --- | --- |
| `TextInput` | ✓ | `(value: string, event)` |
| `TextArea` | ✓ | `(value: string, event)` |
| `Select` | ✓ | `(value: string, event)`, with `multiple`: `(value: string[], event)` |
| `RadioGroup` | ✓ | `(value: string, event)` |
| `CheckboxGroup` | ✓ | `(value: string[], event)` |
| `Listbox` | – | `(value: string \| null)` |

```jsx
const [name, setName] = useState("");

// Both are equivalent
<TextInput value={name} onChange={(event) => setName(event.target.value)} />
<TextInput value={name} onValueChange={setName} />
```

```jsx live
function Demo() {
  const [name, setName] = useState("");
  return (
    <Stack>
      <TextInput value={name} onValueChange={setName} placeholder="Your name" />
      <p>Hello {name || "stranger"}!</p>
    </Stack>
  );
}
```

The same applies to other handlers: a custom handler that does not receive the native event gets its own name (`on<Something>Change`) instead of reusing the name of a native handler.

## Types

The props type of every component is exported (`ButtonProps`, `FormFieldProps`), as is the type of the base hook's props (`BaseButtonProps`). The global helper types `Sys42Props`, `UseComponentOptions`, `UseComponentInterceptor`, `ExactProps` and `EmptyObject` are declared globally by the library. Read the [type strategy](./type-strategy.md) for how they fit together.
