import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp, FaTelegramPlane, FaMapMarkerAlt } from "react-icons/fa";
import { reachGoal } from "@lib/metrika";
import { iconsContacts } from "../../icons/iconsContacts/iconsContact";

const ContactPage = () => {
  return (
    <div className="bg-colorPrimary text-color-text px-4 py-20 md:px-10 md:py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Заголовок */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Контакты</h2>
          <p className="text-color-icons mt-1 text-base md:text-lg">
            Если остались вопросы — напишите или позвоните 💬
          </p>
          <div className="w-20 h-1 bg-color-action mx-auto mt-3 rounded-full" />
        </div>

        {/* Адрес */}
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-color-action mt-1" />
          <div>
            <p className="text-base md:text-lg font-medium">г. Казань, ул. Кул-Гали, 27</p>
            <p className="text-sm text-color-icons">Точка самовывоза (витрины нет)</p>
          </div>
        </div>

        {/* Телефон */}
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-color-action" />
          <a
            href="tel:89656003600"
            className="text-base md:text-lg hover:text-color-action transition-colors"
            onClick={() => reachGoal("click_phone")}
          >
            +7 965 600-3-600
          </a>
        </div>

        {/* Мессенджеры */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-4">
            <FaWhatsapp className="text-green-500" />
            <a
              href="https://wa.me/79270387435"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg hover:text-color-action transition-colors"
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
            className="text-base md:text-lg hover:text-color-action transition-colors"
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
              className="text-base md:text-lg hover:text-color-action transition-colors"
              onClick={() => reachGoal("click_max")}
            >
              Написать в Max
            </a>
          </div>
        </div>

        {/* Заключение */}
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Мы стараемся отвечать быстро — особенно в рабочее время. Если заказ срочный, 
          лучше звонить или писать в мессенджеры 📞
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
