// Contacts.tsx
import { useRef } from "react";
import Telegram from "../../assets/telegram.png";
import WhatsApp from "../../assets/whatsapp.png";
import Phone from "../../assets/phone.png";
import Avito from "../../assets/avito.png";

interface Props {
  hideText: boolean;
}

const Contacts = ({ hideText = false }: Props) => {
  const touchStartRef = useRef<number | null>(null);
  const movedRef = useRef(false);

  const handleTouchStart = () => {
    touchStartRef.current = Date.now();
    movedRef.current = false;
  };

  const handleTouchMove = () => {
    movedRef.current = true; // был свайп, а не тап
  };

  const isValidTap = () => {
    const now = Date.now();
    if (touchStartRef.current && !movedRef.current) {
      const diff = now - touchStartRef.current;
      return diff > 100 && diff < 500;
    }
    return false;
  };

  const handleTouchEnd = (goal: string) => {
    if (isValidTap()) {
      window.ym?.(102322325, "reachGoal", goal);
    }
    touchStartRef.current = null;
    movedRef.current = false;
  };

  const handleDesktopClick = (goal: string) => {
    if (window.innerWidth >= 768) {
      window.ym?.(102322325, "reachGoal", goal);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-between py-1 md:gap-2">
      <ul
        className={`flex transition-all duration-500 ease-in-out ${
          hideText ? "gap-4" : "gap-2"
        }`}
      >
        {/* Телефон — мобилка */}
        <li className="md:mx-4">
          <a
            href="tel:+79656003600"
            aria-label="Phone"
            className="md:hidden block"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd("click_phone")}
            onClick={() => handleDesktopClick("click_phone")}
          >
            <img
              className={`w-8 h-8 rounded-full transition-transform duration-500 ease-in-out ${
                hideText ? "scale-125 translate-y-2.5" : "scale-100"
              }`}
              src={Phone}
              alt="Phone"
            />
          </a>
        </li>

        {/* Telegram, WhatsApp, Avito */}
        {[
          {
            href: "https://t.me/myata_flow",
            img: Telegram,
            label: "Telegram",
            goal: "click_telegram",
          },
          {
            href: "https://wa.me/79270387435",
            img: WhatsApp,
            label: "WhatsApp",
            goal: "click_whatsapp",
          },
          {
            href: "https://avito.ru/brands/myata",
            img: Avito,
            label: "Avito",
            goal: "click_avito",
          },
        ].map(({ href, img, label, goal }) => (
          <li className="md:mx-4 md:mt-5" key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(goal)}
              onClick={() => handleDesktopClick(goal)}
            >
              <img
                className={`w-8 h-8 rounded-full md:w-16 md:h-16 transition-transform duration-500 ease-in-out ${
                  hideText ? "scale-125 translate-y-2.5" : "scale-100"
                }`}
                src={img}
                alt={label}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Телефон текстом на десктопе */}
      <span className="hidden md:inline-block text-base font-medium text-color-text pt-5">
        +7 (965) 600-36-00
      </span>

      <address
        className={`not-italic flex text-[8px] md:text-base md:mt-1 justify-end duration-500 ease-in-out ${
          hideText ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        г. Казань, интернет магазин
      </address>
    </div>
  );
};

export default Contacts;

