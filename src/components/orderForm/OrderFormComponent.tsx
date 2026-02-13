// OrderFormComponent.tsx
import React, { useState } from "react";
import type { ChangeEventHandler } from "react";
import { useAppSelector } from "../../store/app/hook";
import type { OrderState } from "../../store/slices/orderSlice";
import NameInput from "./fields/NameInput";
import HoneypotInput from "./fields/HoneypotInput";
import PhoneInput from "./fields/PhoneInput";
import ExtraQuestions from "./fields/ExtraQuestions";
// import { CONTACTS_METHODS_NAMES } from "../../constants/contactMethodsConfig";
// import type { ContactMethod } from "types/typesContacts";
// import { iconsContacts } from "../../icons/iconsContacts/iconsContact";
import ContactMethodSelector from "./ContactMethodSelector";

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
      className="
        fixed inset-0 z-[1000] 
        bg-color-text bg-opacity-50 backdrop-blur-sm
        overflow-y-auto 
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="
          bg-bg-card rounded-2xl shadow-xl 
          w-full max-w-lg 
          my-6 mx-auto
          p-6 md:p-8 
          relative
        "
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
          className="
            absolute top-4 right-4 
            text-color-text text-2xl font-bold 
            hover:text-color-action transition-colors
          "
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <h2 className="text-2xl md:text-3xl font-cursive font-bold text-mint-700 text-center">
            Подобрать букет
          </h2>

          <HoneypotInput onChange={handleFormData} />
          <NameInput value={order.name} onChange={handleFormData} />
          <PhoneInput value={order.phone} onChange={handleFormData} />
          <ExtraQuestions watchField={hideExtraFields} onChange={handleFormData} />

          <div className="mt-2">
            <ContactMethodSelector
              value={order.contactMethod}
              onChange={handleFormData}
            />
          </div>

          {/* Согласие на обработку */}
          <label className="mt-4 flex items-start gap-2 text-[10px] md:text-base cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={onConsentChange}
              required
              className="mt-1"
            />
            <span className="text-color-text text-sm md:text-base">
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
            className={`
              mt-6 px-6 py-3 rounded-xl 
              bg-color-action text-white font-semibold text-lg 
              transition-colors
              mb-[env(safe-area-inset-bottom)]
              ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-mint-700"}
            `}
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormComponent;