import { useValue } from 'react-cosmos/client';
import { Button } from "../.."

export default function ButtonFixture() {
  const [label] = useValue('Label', { defaultValue: "Blick me!" });
  return <Button onClick={() => window.alert("Hi!")}>{label}</Button>
}