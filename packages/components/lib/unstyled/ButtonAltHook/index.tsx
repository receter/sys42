import { concatClassNames as cn } from '@sys42/utils'

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

function useButton<T>(props: T & ButtonProps) {
  const {
    styles,
    hello,
    className,
    ...restProps
  } = props;

  const mods: Mods = {
    className: cn(
      className,
      styles.button
    ),
    href: "https://google.com",
    //type: true
  }

  console.log(hello);

  return { ...restProps, ...mods };
}

export const Button_a = (propsIn: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps) => {
  const props = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>>(propsIn);
  return <a {...props} />;
}

export const Button = (propsIn: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  const props = useButton<React.ButtonHTMLAttributes<HTMLButtonElement>>(propsIn);
  return <button {...props} />;
}

const test = <>
  <Button hello="test" styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} href={"https://google.com"}>
    Click me
  </Button_a>
</>

