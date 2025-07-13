//Contacts.tsx
import Telegram from "../../assets/telegram.png";
import WhatsApp from "../../assets/whatsapp.png";
import Phone from "../../assets/phone.png";
import Avito from "../../assets/avito.png";

interface Props {
  hideText: boolean;
}

const Contacts = ({ hideText = false }: Props) => {
  const handleClickContacts = (label: string) => {
    const goal = label.toLowerCase();
    window.ym?.(102322325, "reachGoal", `click_${goal}`);
  };

  const handleClickPhone = () => {
    window.ym?.(102322325, "reachGoal", "click_phone");
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-between py-1 md:gap-2">
      <ul
        className={`
          flex transition-all duration-500 ease-in-out
          ${hideText ? "gap-4" : "gap-2"}
        `}
      >
        {/* Телефон: иконка на мобилке, текст на десктопе */}
        <li className="md:mx-4">
          {/* 📱 Мобилка: иконка */}
          <a
            href="tel:+79656003600"
            aria-label="Phone"
            onClick={handleClickPhone}
            className="md:hidden block"
          >
            <img
              className={`w-8 h-8 rounded-full transition-transform duration-500 ease-in-out 
                ${hideText ? "scale-125 translate-y-2.5" : "scale-100"}
              `}
              src={Phone}
              alt="Phone"
            />
          </a>
        </li>

        {/* Иконки: Telegram, WhatsApp, Avito */}
        {[
          { href: "https://t.me/myata_flow", img: Telegram, label: "Telegram" },
          { href: "https://wa.me/79270387435", img: WhatsApp, label: "WhatsApp" },
          { href: "https://avito.ru/brands/myata", img: Avito, label: "Avito" },
        ].map(({ href, img, label }) => (
          <li className="md:mx-4 md:mt-5" key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => handleClickContacts(label)}
            >
              <img
                className={`w-8 h-8 rounded-full md:w-16 md:h-16 transition-transform duration-500 ease-in-out 
                  ${hideText ? "scale-125 translate-y-2.5" : "scale-100"}
                `}
                src={img}
                alt={label}
              />
            </a>
          </li>
        ))}

      </ul>
      <span className="hidden md:inline-block text-base font-medium text-color-text pt-5">
            +7 (965) 600-36-00
      </span>

      <address
        className={`
          not-italic flex text-[8px] md:text-base md:mt-1 justify-end
          duration-500 ease-in-out
          ${hideText ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        г. Казань, интернет магазин
      </address>
    </div>
  );
};

export default Contacts;

