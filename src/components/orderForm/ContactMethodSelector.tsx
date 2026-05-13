// components/ContactMethodSelector.tsx
import { contactMethodConfig } from "@constants/contactMethodsConfig";
import React from "react";
import type { ContactMethod } from "types/typesContacts";

interface Props {
  value: ContactMethod;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const ContactMethodSelector = ({ value, onChange, name = "contactMethod" }: Props) => {
  return (
    <div>
      <p className="mb-2 font-medium text-color-text">Предпочтительный способ связи:</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {contactMethodConfig.map((method) => (
          <label
            key={method.value}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 ${
              value === method.value
                ? "border-color-action bg-color-action text-white"
                : "border-color-icons bg-bg-collor text-color-text transition-colors hover:border-color-action hover:bg-color-action hover:text-white"
            } `}
          >
            <input
              type="radio"
              name={name}
              value={method.value}
              checked={value === method.value}
              onChange={onChange}
              className="hidden"
            />
            <span className="flex h-6 w-6 items-center justify-center text-lg">
              <img src={method.icon} alt={method.label} className="h-5 w-5" />
            </span>
            <span className="w-20 text-sm md:text-base">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ContactMethodSelector;
