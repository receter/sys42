import { Label as UnstyledLabel, LabelProps } from '../../unstyled/Label'

import styles from './styles.module.css'

const labelStyles = {
  label: styles.label,
}

export function Label(props: LabelProps) {
  return <UnstyledLabel
    {...props}
    styles={labelStyles}
  />;
}