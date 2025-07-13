// HeaderContacts.tsx
import Telegram from "../../assets/telegram.png";
import WhatsApp from "../../assets/whatsapp.png";
import Avito from "../../assets/avito.png";

const Contacts = () => {
  const handleClickContacts = (label: string) => {
    const goal = label.toLowerCase(); // "telegram", "whatsapp", "avito"
    window.ym?.(102322325, "reachGoal", `click_${goal}`);
    console.log('click: ', goal)
  };

  const handleClickPhone = () => {
    window.ym?.(102322325, "reachGoal", "click_phone");
    console.log('click_phone')
  };


  return (
    <div className="header__contacts">
      <div className="header__contact-wrapper">
        <address className="header__address">г. Казань, интернет магазин</address>
        <a 
          href="tel:+79656003600" 
          className="header__phone"
          onClick={handleClickPhone}
        >
          +7 (965) 600-3-600
        </a>
      </div>
      <ul className="header__messengrs-wrapper">
        {[
          { href: "https://t.me/myata_flow", img: Telegram, label: "Telegram" },
          { href: "https://wa.me/79270387435", img: WhatsApp, label: "WhatsApp" },
          { href: "https://avito.ru/brands/myata", img: Avito, label: "Avito" }
        ].map(({ href, img, label }) => (
          <li className="header__messenger" key={label}>
            <a 
              href={href}
              className="header__link-messenger"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => handleClickContacts(label)}
            >
              <img src={img} alt={label} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;

