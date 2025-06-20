import type { ChangeEvent } from "react";

// components/orderForm/fields/NameInput.tsx
interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NameInput = ({ value, onChange }: Props) => (
  <input
    type="text"
    name="name"
    placeholder="Имя"
    required
    value={value}
    onChange={onChange}
  />
);

export default NameInput;
