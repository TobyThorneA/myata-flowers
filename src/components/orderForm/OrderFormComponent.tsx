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
            {/* <p className="font-medium text-color-text mb-2">
              Предпочтительный способ связи:
            </p>

            <div className="flex flex-col  md:gap-3 gap-2">
              {CONTACTS_METHODS_NAMES.map((method: ContactMethod) => (
                
                <label
                  key={method}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl cursor-pointer border ${
                    order.contactMethod === method
                      ? "border-color-action bg-color-action text-white"
                      : "border-color-icons bg-bg-collor text-color-text hover:border-color-action hover:bg-color-action hover:text-white transition-colors"
                  }`}
                >
                  <input
                    type="radio"
                    value={method}
                    name="contactMethod"
                    checked={order.contactMethod === method}
                    onChange={handleFormData}
                    className="hidden"
                  />

                  <span className="text-lg">
                    {
                      method === "call" 
                        && 
                        (<div 
                          className="w-6 h-6 flex justify-center items-center"
                        >
                          <img src={iconsContacts.call} alt="Max" className="w-5 h-5 text-green-500" />
                        </div>)
                    }
                    {
                      method === "telegram" 
                        && 
                        (<div 
                          className="w-6 h-6 flex justify-center items-center"
                        >
                          <img src={iconsContacts.telegram} alt="Max" className="w-5 h-5 text-green-500" />
                        </div>)
                    }
                    {
                      method === "whatsapp" 
                        && 
                        (<div 
                          className="w-6 h-6 flex justify-center items-center"
                        >
                          <img src={iconsContacts.whatsapp} alt="Max" className="w-5 h-5 text-green-500" />
                        </div>)
                    }
                    {
                      method === "max" 
                        && 
                        (<div 
                          className="w-6 h-6 flex justify-center items-center"
                        >
                          <img src={iconsContacts.max} alt="Max" className="w-5 h-5 text-green-500" />
                        </div>)
                    }
                  </span>
                  <span className="text-sm md:text-base w-20">
                    {{
                      call: "Позвонить",
                      telegram: "Telegram",
                      whatsapp: "WhatsApp",
                      max: "Max"
                    }[method]}
                  </span>
                </label>
              ))}
            </div> */}
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