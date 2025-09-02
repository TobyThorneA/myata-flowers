import type { ChangeEvent } from "react";

// components/orderForm/fields/PhoneInput.tsx
interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function PhoneInput({value, onChange} : Props) {
  return (
    <input
      type="tel" 
      name="phone" 
      placeholder="Телефон"
      required
      value={value} 
      onChange={onChange} 
     />
  )
}

export default PhoneInput