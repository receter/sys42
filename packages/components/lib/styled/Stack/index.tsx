import { Stack as UnstyledStack, StackProps } from '../../unstyled/Stack'

import styles from './styles.module.css'

const stackStyles = {
  stack: styles.stack,
}

export function Stack(props: StackProps) {
  return <UnstyledStack
    {...props}
    styles={stackStyles}
  />;
}