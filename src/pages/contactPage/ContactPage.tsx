import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp, FaTelegramPlane, FaMapMarkerAlt } from "react-icons/fa";

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
            >
              Написать в Telegram
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
