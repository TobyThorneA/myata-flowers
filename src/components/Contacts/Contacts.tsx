// Contacts.tsx
import { reachGoal } from "@lib/metrika";
import { useRef } from "react";

import { iconsContacts } from "../../icons/iconsContacts/iconsContact";

interface Props {
  hideText?: boolean;
}

const Contacts = ({ hideText = false }: Props) => {
  const touchStartRef = useRef<number | null>(null);
  const movedRef = useRef(false);

  const handleTouchStart = () => {
    touchStartRef.current = Date.now();
    movedRef.current = false;
  };

  const handleTouchMove = () => {
    movedRef.current = true;
  };

  const isValidTap = () => {
    if (!touchStartRef.current || movedRef.current) return false;
    const diff = Date.now() - touchStartRef.current;
    return diff > 100 && diff < 500;
  };

  const sendGoal = (goal: string) => {
    reachGoal(goal);
  };

  const handleTouchEnd = (goal: string) => {
    if (isValidTap()) sendGoal(goal);
    touchStartRef.current = null;
    movedRef.current = false;
  };

  const handleClick = (goal: string) => {
    sendGoal(goal);
  };

  const messengers = [
    {
      href: "https://t.me/myata_flow",
      img: iconsContacts.telegram,
      label: "Telegram",
      goal: "click_telegram",
    },
    {
      href: "https://wa.me/79270387435",
      img: iconsContacts.whatsapp,
      label: "WhatsApp",
      goal: "click_whatsapp",
    },
    {
      href: "https://max.ru/u/f9LHodD0cOIOfIqWUQWsvjdGVVKvB2tm5Z-KljGiCM0Emoqv9WHY7xsy1MQ",
      img: iconsContacts.max,
      label: "Max",
      goal: "click_max",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-2 py-1 md:gap-2">
      <ul
        className={`flex transition-all duration-500 ease-in-out ${hideText ? "gap-4" : "gap-2"}`}
      >
        {/* Телефон — мобилка */}
        <li className="md:mx-4">
          <a
            href="tel:+79656003600"
            aria-label="Phone"
            className="block md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd("click_phone")}
          >
            <img
              className={`h-8 w-8 rounded-full transition-transform duration-500 ease-in-out ${
                hideText ? "translate-y-2.5 scale-125" : "scale-100"
              }`}
              src={iconsContacts.call}
              alt="Phone"
            />
          </a>
        </li>

        {/* Telegram, WhatsApp, Avito */}
        {messengers.map(({ href, img, label, goal }) => (
          <li className="md:mx-4 md:mt-5" key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(goal)}
              onClick={() => handleClick(goal)}
            >
              <img
                className={`h-8 w-8 rounded-full transition-transform duration-500 ease-in-out md:h-16 md:w-16 ${
                  hideText ? "translate-y-2.5 scale-125" : "scale-100"
                }`}
                src={img}
                alt={label}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Телефон текстом на десктопе */}
      <a
        href="tel:+79656003600"
        aria-label="Phone number"
        className="hidden pt-5 text-base font-medium text-color-text md:inline-block"
        onClick={() => handleClick("click_phone")}
      >
        +7 (965) 600-36-00
      </a>

      <address
        className={`fonst-sansSerif flex justify-end text-[8px] font-semibold not-italic duration-500 ease-in-out md:mt-1 md:text-base ${
          hideText ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        г. Казань, интернет магазин
      </address>
    </div>
  );
};

export default Contacts;
