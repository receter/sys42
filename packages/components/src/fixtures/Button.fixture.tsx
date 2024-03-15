import { useValue } from 'react-cosmos/client';
import { Button } from "../.."
import { useRef } from 'react';

export default function ButtonFixture() {
  const [label] = useValue('Label', { defaultValue: "Blick me!" });
  const refButton = useRef(null);
  return <Button ref={refButton} onClick={() => window.alert("Hi!")}>{label}</Button>
}