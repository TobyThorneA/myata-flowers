// // OrderFormComponent.tsx
// import type { ChangeEventHandler } from "react";
// import { useAppSelector } from "../../store/app/hook";
// import type { OrderState } from "../../store/slices/orderSlice";
// import NameInput from "./fields/NameInput";
// import HoneypotInput from "./fields/HoneypotInput";
// import PhoneInput from "./fields/PhoneInput";
// import ExtraQuestions from "./fields/ExtraQuestions";
// import { CONTACTS_METHODS_NAMES } from "../../constants/contactMethods";

// interface PropsOrder {
//   handleSubmit: (e: React.FormEvent) => void;
//   handleFormData: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
//   onClose: () => void;
//   hideExtraFields: boolean;
// }

// const OrderFormComponent = ({ handleSubmit, handleFormData, onClose, hideExtraFields } : PropsOrder) => {
//   const order = useAppSelector(state => state.order as OrderState)

//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup" onClick={(e) => e.stopPropagation()}>
//         <button className="popup__close" onClick={onClose}>×</button>

        
//           <form onSubmit={handleSubmit} className="popup__form">
//             <h2>Подобрать букет</h2>

//             <HoneypotInput onChange={handleFormData}/>
//             <NameInput value={order.name} onChange={handleFormData}/>
//             <PhoneInput value={order.phone} onChange={handleFormData}/>
//             <ExtraQuestions watchField={hideExtraFields} onChange={handleFormData}/>

//             <div className="contact-methods">
//               <p>Предпочтительный способ связи:</p>
//               <div className="method-options">

//                 {CONTACTS_METHODS_NAMES.map(method => (
//                   <label key={method} className={`method-option ${order.contactMethod === method ? "active" : ""}`}>
//                     <input
//                       type="radio"
//                       value={method}
//                       name="contactMethod"
//                       checked={order.contactMethod === method}
//                       onChange={handleFormData}
//                     />
//                     <span className="option-icon">
//                       {method === "call" && "📞"}
//                       {method === "telegram" && "✈️"}
//                       {method === "whatsapp" && "💬"}
//                     </span>
//                     <span className="option-text">
//                       {{
//                         call: "Позвонить",
//                         telegram: "Telegram",
//                         whatsapp: "WhatsApp",
//                       }[method]}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <button type="submit">Заказать</button>
//           </form>

//       </div>
//     </div>
//   );
// }

// export default OrderFormComponent;

import React, { useState } from "react";
import type { ChangeEventHandler } from "react";
import { useAppSelector } from "../../store/app/hook";
import type { OrderState } from "../../store/slices/orderSlice";
import NameInput from "./fields/NameInput";
import HoneypotInput from "./fields/HoneypotInput";
import PhoneInput from "./fields/PhoneInput";
import ExtraQuestions from "./fields/ExtraQuestions";
import { CONTACTS_METHODS_NAMES } from "../../constants/contactMethods";

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

  // Локальное состояние для чекбокса согласия
  const [consentChecked, setConsentChecked] = useState(false);

  const onConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentChecked(e.target.checked);
  };

  // Чтобы форму нельзя было отправить без согласия — блокируем кнопку если не отмечено
  const isSubmitDisabled = !consentChecked;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleSubmit} className="popup__form">
          <h2>Подобрать букет</h2>

          <HoneypotInput onChange={handleFormData} />
          <NameInput value={order.name} onChange={handleFormData} />
          <PhoneInput value={order.phone} onChange={handleFormData} />
          <ExtraQuestions watchField={hideExtraFields} onChange={handleFormData} />

          <div className="contact-methods">
            <p>Предпочтительный способ связи:</p>
            <div className="method-options">
              {CONTACTS_METHODS_NAMES.map((method) => (
                <label
                  key={method}
                  className={`method-option ${order.contactMethod === method ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    value={method}
                    name="contactMethod"
                    checked={order.contactMethod === method}
                    onChange={handleFormData}
                  />
                  <span className="option-icon">
                    {method === "call" && "📞"}
                    {method === "telegram" && "✈️"}
                    {method === "whatsapp" && "💬"}
                  </span>
                  <span className="option-text">
                    {{
                      call: "Позвонить",
                      telegram: "Telegram",
                      whatsapp: "WhatsApp",
                    }[method]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Чекбокс согласия */}
          <label className="mt-4 flex items-start gap-2 text-[9px] md:text-base cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={onConsentChange}
              required
              className="mt-1"
            />
            <span>
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

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`mt-6 px-6 py-3 rounded bg-color-action text-white font-semibold transition-colors ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormComponent;

