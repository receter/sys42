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

  return { props: restProps, mods };
}

export const Button_a = (propsIn: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps) => {
  const { props, mods } = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>>(propsIn);
  return <a {...props} {...mods} />;
}

export const Button = (propsIn: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps) => {
  const { props, mods } = useButton<React.AnchorHTMLAttributes<HTMLAnchorElement>>(propsIn);
  return <button {...props} {...mods} />;
}

const test = <>
  <Button hello="test" styles={{ button: "asdf" }} type="submit" onClick={() => { }}>
    Click me
  </Button>

  <Button_a hello="test" styles={{ button: "asdf" }} type="submit" href={"https://google.com"}>
    Click me
  </Button_a>
</>

