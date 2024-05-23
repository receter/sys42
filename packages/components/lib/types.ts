// This file is not named types.d.ts because vite-plugin-dts does not pick it up
// ToDo: Find a way to make vite-plugin-dts pick up types.d.ts files or file an issue

export type Sys42Props<Props, ElemProps = void> = ElemProps extends void
  ? Props
  : Omit<ElemProps, keyof Props> & Props;
