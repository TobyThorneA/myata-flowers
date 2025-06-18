import "./header.scss"
import logo from "../assets/logo.jpg"
import Telegram from "../assets/telegram.png"
import WhatsApp from "../assets/whatsapp.png"
import Avito from "../assets/avito.png"
import OrderForm from "../orderForm/OrderForm"
import { useEffect, useState } from "react"
import OrderButton from "../orderButton/OrderButton"
// import { Link } from "react-router-dom"

const Header = () => {

    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
    const closeOrderForm = () => setIsOrderFormOpen(false);

  useEffect(() => {
  if (isOrderFormOpen) {
    document.body.classList.add('OrderForm-open');
  } else {
    document.body.classList.remove('OrderForm-open');
  }
}, [isOrderFormOpen]);

  return (
    <header className='header'>
      {isOrderFormOpen && <OrderForm onClose={closeOrderForm}/>}
                  {/* Основной враппер для содержимого */}
            {/* <div className="header__wrapper"> */}
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
        <OrderButton/>
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
      {/* </div> */}
    </header>
  )
}

export default Header