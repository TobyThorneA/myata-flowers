import { reachGoal } from "@lib/metrika";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import { iconsContacts } from "../../icons/iconsContacts/iconsContact";

const ContactPage = () => {
  return (
    <div className="bg-colorPrimary px-4 py-20 text-color-text md:px-10 md:py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {/* Заголовок */}
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Контакты</h2>
          <p className="mt-1 text-base text-color-icons md:text-lg">
            Если остались вопросы — напишите или позвоните 💬
          </p>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-color-action" />
        </div>

        {/* Адрес */}
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="mt-1 text-color-action" />
          <div>
            <p className="text-base font-medium md:text-lg">г. Казань, ул. Кул-Гали, 27</p>
            <p className="text-sm text-color-icons">Точка самовывоза (витрины нет)</p>
          </div>
        </div>

        {/* Телефон */}
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-color-action" />
          <a
            href="tel:89656003600"
            className="text-base transition-colors hover:text-color-action md:text-lg"
            onClick={() => reachGoal("click_phone")}
          >
            +7 965 600-3-600
          </a>
        </div>

        {/* Мессенджеры */}
        <div className="mt-2 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <FaWhatsapp className="text-green-500" />
            <a
              href="https://wa.me/79270387435"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-colors hover:text-color-action md:text-lg"
              onClick={() => reachGoal("click_whatsapp")}
            >
              Написать в WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaTelegramPlane className="text-sky-400" />
            <a
              href="https://t.me/myata_flow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-colors hover:text-color-action md:text-lg"
              onClick={() => reachGoal("click_telegram")}
            >
              Написать в Telegram
            </a>
          </div>

          <div className="flex items-center gap-4">
            <img src={iconsContacts.max} alt="" className="h-4 w-4 rounded-full" />
            <a
              href="https://max.ru/u/f9LHodD0cOIOfIqWUQWsvjdGVVKvB2tm5Z-KljGiCM0Emoqv9WHY7xsy1MQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-colors hover:text-color-action md:text-lg"
              onClick={() => reachGoal("click_max")}
            >
              Написать в Max
            </a>
          </div>
        </div>

        {/* Заключение */}
        <p className="mt-6 text-base leading-relaxed md:text-lg">
          Мы стараемся отвечать быстро — особенно в рабочее время. Если заказ срочный, лучше звонить
          или писать в мессенджеры 📞
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
