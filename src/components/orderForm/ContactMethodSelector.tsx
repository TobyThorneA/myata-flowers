// components/ContactMethodSelector.tsx
import { contactMethodConfig } from '@constants/contactMethodsConfig';
import React from 'react';
import type { ContactMethod } from "types/typesContacts";

interface Props {
  value: ContactMethod;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const ContactMethodSelector = ({ value, onChange, name = 'contactMethod' }: Props) => {
  return (
    <div>
      <p className="font-medium text-color-text mb-2">
        Предпочтительный способ связи:
      </p>
      <div className="flex flex-col md:gap-3 gap-2">
        {contactMethodConfig.map((method) => (
          
          <label
            key={method.value}
            className={`
              flex items-center justify-center gap-2 px-3 py-2 rounded-xl cursor-pointer border
              ${value === method.value
                ? 'border-color-action bg-color-action text-white'
                : 'border-color-icons bg-bg-collor text-color-text hover:border-color-action hover:bg-color-action hover:text-white transition-colors'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={method.value}
              checked={value === method.value}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-lg w-6 h-6 flex justify-center items-center">
              <img src={method.icon} alt={method.label} className="w-5 h-5" />
            </span>
            <span className="text-sm md:text-base w-20">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ContactMethodSelector;