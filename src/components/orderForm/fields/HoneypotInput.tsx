import type { ChangeEvent } from "react";

// components/orderForm/fields/HoneypotInput.tsx
interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const HoneypotInput = ({onChange}: Props) => {
  return (
    <input
      type="text"
      name="honeypot"
      style={{ display: 'none' }}
      autoComplete="off"
      onChange={onChange}
    />
  )
}

export default HoneypotInput;
