import { concatClassNames as cn } from '@sys42/utils'

import React, { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

type Mods = {
  className: string;
}

interface ButtonProps {
  hello: string;
  className?: string;
  styles: {
    button: string;
  }
}

function makeAs<T>(render: (props: T, mods: Mods) => ReactNode) {
  return (props: T & ButtonProps) => {
    const {
      styles,
      hello,
      className,
      ...restProps
    } = props;

    const mods = {
      className: cn(
        className,
        styles.button
      )
    }

    console.log(hello);

    return render(restProps, mods);
    //return render(restProps as unknown as T, mods);
  }
}

const Button_a = makeAs<React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, mods) => <a {...props} {...mods} />);
const Button = makeAs<React.ButtonHTMLAttributes<HTMLButtonElement>>((props, mods) => <button {...props} {...mods} />);

// const Button: typeof Component & {
//   makeAs?: typeof makeAs;
// } = Component;

// export {
//   Button
// };


const test = <>
  <Button hello="test" styles={{ button: "asdf" }} href="asdf" type="submit" onClick={() => { }}>
    Click me
  </Button>

  <a type="submit">asfd</a>

  <Button_a hello="test" styles={{ button: "asdf" }} type="submit" asdf="asf" href={"https://google.com"}>
    Click me
  </Button_a>
</>