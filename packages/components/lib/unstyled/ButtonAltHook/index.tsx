import { concatClassNames as cn } from '@sys42/utils'

type Mods = {
  className: string;
  href: string;
}

interface ButtonProps {
  type: boolean;
  hello: string;
  className?: string;
  styles: {
    button: string;
  }
}

function useButton<T>(props: Omit<T, keyof ButtonProps> & ButtonProps) {
  const {
    styles,
    hello,
    className,
    type,
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
  console.log(type);

  return { props: restProps, mods };
}


export const Button = (propsIn: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> & ButtonProps) => {
  const { props, mods } = useButton<React.ButtonHTMLAttributes<HTMLButtonElement>>(propsIn);
  return <button {...props} {...mods} />;
}

export const Button_a = (propsIn: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonProps> & ButtonProps) => {
  const { props, mods } = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>>(propsIn);
  return <a {...props} {...mods} />;
}

const test = <>
  <Button styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} href={"https://google.com"}>
    Click me
  </Button_a>
</>

