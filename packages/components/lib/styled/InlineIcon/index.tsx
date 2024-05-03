import { InlineIcon as UnstyledInlineIcon, InlineIconProps } from '../../unstyled/InlineIcon'

import styles from './styles.module.css'

const inlineIconStyles = {
  inlineIcon: styles.inlineIcon,
}

export function InlineIcon(props: InlineIconProps) {
  return <UnstyledInlineIcon
    {...props}
    styles={inlineIconStyles}
  />;
}
