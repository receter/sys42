// This file is not named types.d.ts because vite-plugin-dts does not pick it up
// ToDo: Find a way to make vite-plugin-dts pick up types.d.ts files or file an issue

type Sys42Props<Props, TagName extends HTMLElementTagName> = Omit<
  React.ComponentPropsWithoutRef<TagName>,
  keyof Props
> &
  Props;

type HTMLElementTagName = keyof HTMLElementTagNameMap;

type UseComponentOptions<CustomProps, TagName extends HTMLElementTagName> = {
  props: CustomProps; // & Omit<Record<string, unknown>, keyof CustomProps>;
  elementType: TagName;
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[TagName]>;
};

type UseComponentInterceptor<
  TagName extends HTMLElementTagName,
  Draft = {
    elementProps: React.ComponentPropsWithoutRef<TagName>;
  },
> = (draft: Draft) => void;

/**
 * Constructs a type that enforces only the properties specified in `AllowedProps` are allowed from `PossibleProps`.
 * Any extra properties present in `PossibleProps` that are not in `AllowedProps` are set to `never`,
 * effectively disallowing them and causing a TypeScript error if they are used.
 *
 * @template AllowedProps - The subset of props that are allowed for the next component or function.
 * @template PossibleProps - The original props type containing all possible properties.
 *
 * @remarks
 * This utility type is useful for ensuring that no unintended props are passed down to a component or function,
 * helping to catch bugs where extra props might be mistakenly included. It enforces strict compliance with the
 * allowed properties by setting any disallowed properties to `never`, which causes a type error if they are used.
 *
 * @example
 * type PossibleProps = { a: string; b: number; c: boolean; };
 * type AllowedProps = { a: string; };
 * type CleanProps = ExactProps<AllowedProps, PossibleProps>;
 * // CleanProps is equivalent to:
 * // {
 * //   b: never;
 * //   c: never;
 * //   a: string;
 * // }
 * // Attempting to use properties 'b' or 'c' will result in a TypeScript error.
 */
type ExactProps<AllowedProps, PossibleProps> = {
  [K in keyof Omit<PossibleProps, keyof AllowedProps>]?: never;
} & AllowedProps;

type EmptyObject = Record<string | number | symbol, never>;
