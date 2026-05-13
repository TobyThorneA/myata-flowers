// OrderFormComponent.tsx
import type { ChangeEventHandler } from "react";
import React, { useState } from "react";

import { useAppSelector } from "../../store/app/hook";
import type { OrderState } from "../../store/slices/orderSlice";
// import { CONTACTS_METHODS_NAMES } from "../../constants/contactMethodsConfig";
// import type { ContactMethod } from "types/typesContacts";
// import { iconsContacts } from "../../icons/iconsContacts/iconsContact";
import ContactMethodSelector from "./ContactMethodSelector";
import ExtraQuestions from "./fields/ExtraQuestions";
import HoneypotInput from "./fields/HoneypotInput";
import NameInput from "./fields/NameInput";
import PhoneInput from "./fields/PhoneInput";

interface PropsOrder {
  handleSubmit: (e: React.FormEvent) => void;
  handleFormData: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose: () => void;
  hideExtraFields: boolean;
}

const OrderFormComponent = ({
  handleSubmit,
  handleFormData,
  onClose,
  hideExtraFields,
}: PropsOrder) => {
  const order = useAppSelector((state) => state.order as OrderState);
  const [consentChecked, setConsentChecked] = useState(false);

  const onConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentChecked(e.target.checked);
  };

  const isSubmitDisabled = !consentChecked;

  return (
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto bg-color-text bg-opacity-50 backdrop-blur-sm"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="relative mx-auto my-6 w-full max-w-lg rounded-2xl bg-bg-card p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Скрытый scroll для Webkit */}
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold text-color-text transition-colors hover:text-color-action"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-mint-700 text-center font-cursive text-2xl font-bold md:text-3xl">
            Подобрать букет
          </h2>

          <HoneypotInput onChange={handleFormData} />
          <NameInput value={order.name} onChange={handleFormData} />
          <PhoneInput value={order.phone} onChange={handleFormData} />
          <ExtraQuestions watchField={hideExtraFields} onChange={handleFormData} />

          <div className="mt-2">
            <ContactMethodSelector value={order.contactMethod} onChange={handleFormData} />
          </div>

          {/* Согласие на обработку */}
          <label className="mt-4 flex cursor-pointer items-start gap-2 text-[10px] md:text-base">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={onConsentChange}
              required
              className="mt-1"
            />
            <span className="text-sm text-color-text md:text-base">
              Я даю согласие на обработку моих персональных данных (имя и телефон) в соответствии с{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-color-action underline"
              >
                политикой конфиденциальности
              </a>
              .
            </span>
          </label>

          {/* Кнопка */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`mb-[env(safe-area-inset-bottom)] mt-6 rounded-xl bg-color-action px-6 py-3 text-lg font-semibold text-white transition-colors ${isSubmitDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-mint-700"} `}
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormComponent;
