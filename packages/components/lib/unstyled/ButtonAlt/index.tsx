import { concatClassNames as cn } from '@sys42/utils'

import { ReactNode } from 'react';

type Mods = {
  className: string;
  href: string;
  //type: boolean;
}

interface ButtonProps {
  hello: string;
  className?: string;
  styles: {
    button: string;
  }
}

export function makeAs<T>(render: (props: Omit<T, keyof ButtonProps>, mods: Mods) => ReactNode) {
  return (props: T & ButtonProps) => {

    const {
      styles,
      hello,
      className,
      ...restProps
    } = props;

    console.log(test);

    const mods: Mods = {
      className: cn(
        className,
        styles.button
      ),
      href: "https://google.com",
      //type: true
    }

    console.log(hello);

    return render(restProps, mods);
    //return render(restProps as unknown as T, mods);
  }
}

export const Button_a = makeAs<React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, mods) => <a {...props} {...mods} />);
export const Button = makeAs<React.ButtonHTMLAttributes<HTMLButtonElement>>((props, mods) => <button {...props} {...mods} />);

const test = <>
  <Button hello="test" styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} type="submit" href={"https://google.com"}>
    Click me
  </Button_a>
</>
