# Raw thoughts

A document with raw thoughts and ideas just so they don't get lost.

## Button

A link that looks like a button currently does not trigger on SPACE key press.

I should probably add this behavior to the `Button` component.

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#toggle_button_example

https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

Should SPACE to be allowed to activate the `<a>` element?
https://github.com/w3c/aria/issues/1701

# From the Marketing website project

## Don’t overthink it

Not everything needs to be part of your design system. In general you can apply the
rule of three (https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)):
If you don’t need an element at least 3 times it might be better to just make a local component.

Eg. Your websites main navigation propably is not part of your system. But if you have several
website projects that all have a similar navigation, it can be.

## Questions

Is the change of a resource or even a color (e.g. logo) a breaking change?

# ClassName

Setting the attribute className of a component should always set a class for the outermost(?) html element in the component.

```javascript
<div className={cn(className, styles.nameOfTheComponent)}>
```

The internal className for the outermost element is always the name of the component.

.nameOfTheComponent {} always in the first line

When I open the styles file I immediately know what it is in contrast to using eg. .root (which i used previously)

# Defining breakpoints

Not possible now. In the future this might be achieveable using user defined environment variables

```css
/* For desktop-up */
@media (min-width: env(--min-width-desktop-up)) {
}
/* For desktop-down */
@media (max-width: env(--max-width-desktop-down)) {
}
```

# Spacing

Components always have no spacing, if you want spacing assign a class and give it margin-top.
Why margin top?

THIS IS ALSO MUCH EASIER TO READ!!!! Because when things have margin everywhere you never know how much
spacing this is in the end. Never do a padding and margin spaceing together!!!!

h2 + a {
margin-top: 123px;
}

instead of

h2 {
margin-bottom: 123px;
}

Problem

<itemA inline-block><br>
<itemB>

itemA + itemB { margin-top: 1234}

does not work this way

in this case .navColumn .navC2a + br + a or .navColumn .navC2a + br + a, .navColumn .navC2a + a

# Naming

Can anyone recommend a place where i can find common namings for modules?
such as hero, teaser, imagetexttwocolumns....
A main issue for me is naming things
overline
from Martin Fowler: “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”
This is why good namin is so important

heading, title, headline

highlighted or highlight

This is so great about using css modules, naming is so much easier in a smaller domain
just name a link .. link in a global context it might be vague but in a very narrow context it is very clear what is meant.

footer
bottom, bottomContent

## BEM variant

Because of CSS Modules I use my own version of BEM

camelCase for names
nothing for child
"\_" for modifier

```css
.personList {
}
.personListItem {
}
.personListItem_highlighted {
}
```

## Difference Component to htmlTag

You can not say in a page CSS something like: `h2 + ButtonPrimary`.

Need have to use a className in context in this case

## Margin on container

The container of a component should have as litle styling as possible especially no margin and (also no negative margin).

## Thoughts

keep it simple
solve a propblem, not abstract to much just because you can

## Naming container classes

.thisAndThat
.logoAndMenuToggle

Good:
.menu
.menuInner

Bad:
.menuWrapper
.menu

because your container should be .menu

Sometimes it is cool for a component to be able to pass a max-width for a text like a heading.
This should always be passed as a rem value so that the line-breaks are always the same.

```jsx
<Component
  title={"A simple yet powerful user testing tool."}
  titleWidth={"20em"}
/>
```

## Container box sizing

The box-sizing property should be set to border box for most containers.
box-sizing: border-box;
because when the element is styled with say 800px width it should not be wider because of internal padding

/_ Do not include like a shared helper.module.css in components/ !!!! Order is not guranteed _/
https://dev.to/receter/avoiding-css-order-of-appearance-problems-with-css-modules-3j7p

## SVG

vector-effect="non-scaling-stroke"

```
<line vector-effect="non-scaling-stroke" stroke="black" stroke-width="5"
```
