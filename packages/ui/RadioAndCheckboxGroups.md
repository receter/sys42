## Radio Group

In `HTML`, you can group radio buttons by using the `name` attribute. You can do the same with the `Radio` component in sys42. The simplest way to create a group of radio buttons is as follows:

```jsx
<>
  <Radio name="myGroup" value="option1" onChange={handleChangeGroup} /> Option 1
  <br />
  <Radio name="myGroup" value="option2" onChange={handleChangeGroup} /> Option 2
</>
```

While this works, the labels are not associated with the radio buttons. To associate a label with a radio button, you can either associate a label or use the `LabeledControl` component:

```jsx
<>
  <LabeledControl
    control={
      <Radio name="myGroup" value="option1" onChange={handleChangeGroup} />
    }
  >
    Option 1
  </LabeledControl>
  <LabeledControl
    control={
      <Radio name="myGroup" value="option2" onChange={handleChangeGroup} />
    }
  >
    Option 2
  </LabeledControl>
</>
```

This will render `label` elements that are properly associated with the radio buttons:

```html
<label>
  <input name="myGroup" type="radio" value="option1" />
  Option 1
</label>
```

### Group Labeling for Accessibility (a11y)

For accessibility reasons, it is recommended to provide a label for the group of radio buttons. In HTML, one common method is to use a `fieldset` and `legend`:

```html
<fieldset>
  <legend>Choose an option</legend>
  <label>
    <input name="myGroup" type="radio" value="option1" />
    Option 1
  </label>
  <label>
    <input name="myGroup" type="radio" value="option2" />
    Option 2
  </label>
</fieldset>
```

Another method is to use `role="radiogroup"` along with `aria-labelledby` or `aria-label` attributes:

```html
<div role="radiogroup" aria-label="Choose an option">
  <label>
    <input name="myGroup" type="radio" value="option1" />
    Option 1
  </label>
  <label>
    <input name="myGroup" type="radio" value="option2" />
    Option 2
  </label>
</div>
```

### Using the `RadioGroup` Component

You can achieve the same output with the `RadioGroup` component:

```jsx
<RadioGroup
  value={selected}
  onChangeValue={handleChangeValue}
  name="myGroup"
  aria-label="Choose an option"
>
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
</RadioGroup>
```

If you place the `RadioGroup` inside a `fieldset` or the `FormFieldSet` component, you can omit the `aria-label` in this case, as the `fieldset` provides sufficient semantic structure.

The `name` attribute is not stricly required because the checked state is controlled by React. But a `name` can be set in order to make sure all input elements have the name attribute set.

```jsx
<FormFieldSet label="Choose an option">
  <RadioGroup value={selected} onChangeValue={handleChangeValue}>
    <RadioGroupItem value="option1">Option 1</RadioGroupItem>
    <RadioGroupItem value="option2">Option 2</RadioGroupItem>
  </RadioGroup>
</FormFieldSet>
```

This approach eliminates the need for additional `aria` attributes because the semantics of `fieldset` and `legend` are sufficient. The rendered HTML would look like this:

```html
<fieldset>
  <legend>Choose an option</legend>
  <div role="radiogroup">
    <label>
      <input type="radio" value="option1" />
      Option 1
    </label>
    <label>
      <input type="radio" value="option2" />
      Option 2
    </label>
  </div>
</fieldset>
```

## Checkbox Group

The `CheckboxGroup` component is similar to the `RadioGroup` component. Here is an example of how to use the `CheckboxGroup` component:

```jsx
<FormFieldSet label="Choose options">
  <CheckboxGroup
    value={checkboxGroupValue}
    onChangeValue={handleChangeValue}
    onChange={handleChange}
    name="myGroup"
  >
    <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
    <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
    <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
  </CheckboxGroup>
</FormFieldSet>
```

This will render a group of checkboxes with a label:

```html
<fieldset>
  <legend>Choose an option</legend>
  <div role="group">
    <label>
      <input name="myGroup" type="radio" value="option1" />
      Option 1
    </label>
    <label>
      <input name="myGroup" type="radio" value="option2" />
      Option 2
    </label>
  </div>
</fieldset>
```
