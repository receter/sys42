import { ReactNode } from "react";

export type Sys42RenderArgs<T, E extends HTMLElement, ComponentProps, ElementProps> = {
  // XXX why does "Omit<Omit<T, keyof ButtonProps>, keyof ButtonProps>," work and "Omit<T, keyof ButtonProps>," does not?
  passedOnProps: Omit<Omit<T, keyof ComponentProps>, keyof ComponentProps>;
  elementProps: ElementProps;
  ref: (instance: E | null) => void;
  props: Omit<T, keyof ComponentProps> & ComponentProps;
};

export type Sys42Render<T, E extends HTMLElement, ComponentProps, ElementProps> = (
  args: Sys42RenderArgs<T, E, ComponentProps, ElementProps>
) => ReactNode;