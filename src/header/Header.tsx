import "./header.scss"
import logo from "../assets/logo.jpg"
import Telegram from "../assets/telegram.png"
import WhatsApp from "../assets/whatsapp.png"
import Avito from "../assets/avito.png"
import Popup from "../App/Popup/Popup"
import { useEffect, useState } from "react"

const Header = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
  if (isPopupOpen) {
    document.body.classList.add('popup-open');
  } else {
    document.body.classList.remove('popup-open');
  }
}, [isPopupOpen]);

  return (
    <header className='header'>
      {isPopupOpen && <Popup onClose={closePopup}/>}
      <div className="header__left">
        <img 
          className="header__logo"
          src={logo}
          alt="Логотип студии" 
        />
        <span className="header__storeName">цветочная студия</span>
      </div>
      <div className="header__slogan-wrapper">
        <h1 className="header__slogan">
          Заказывайте цветы онлайн —
          быстро, удобно, с заботой
        </h1>
        <button className="header__buttonAction" onClick={() => openPopup()}>
          Подобрать букет
        </button>
      </div>
      <div className="header__contacts">
        <div className="header__contact-wrapper">
          <address className="header__address">
            г. Казань, интернет магазин
          </address>
          <a href="tel:+79656003600" className="header__phone">+7 (965) 600-3-600</a>
        </div>
        <ul className="header__messengrs-wrapper">
          <li className="header__messenger">
          <a 
            href="https://t.me/myata_flow" 
            className="header__link-messenger" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Telegram"
          >
            <img src={Telegram} alt="" />
          </a>
          </li>
          <li className="header__messenger">
          <a 
            href="https://wa.me/79270387435" 
            className="header__link-messenger" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp"
          >
            <img src={WhatsApp} alt="WhatsApp" />
          </a>
          </li>
          <li className="header__messenger">
          <a 
            href="https://avito.ru/brands/myata" 
            className="header__link-messenger" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Avito"
          >
            <img src={Avito} alt="Авито" />
          </a>
          </li>
        </ul>
      </div>
      
    </header>
  )
}

export default Header