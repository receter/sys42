// This file is not named types.d.ts because vite-plugin-dts does not pick it up
// ToDo: Find a way to make vite-plugin-dts pick up types.d.ts files or file an issue

export type Sys42ComponentProps<Attributes = React.AllHTMLAttributes<HTMLElement>> = Attributes;

export type Sys42PolymorphicComponentProps = Sys42ComponentProps & {
  as?: React.ElementType;
}
// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/

export type Sys42UnstyledComponentProps<ComponentProps, ClassMap, InternalComponents = void> =
  InternalComponents extends void ? ComponentProps & {
    styles: ClassMap;
  } : ComponentProps & {
    styles: ClassMap;
    components: InternalComponents;
  }