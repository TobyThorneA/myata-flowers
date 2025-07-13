//Header.tsx
import "./header.scss"
import logo from "../../assets/logo.jpg"
import OrderForm from "@components/orderForm/OrderForm"
import { useEffect, useState } from "react"
import OrderButton from "../orderButton/OrderButton"
import HeaderContacts from "./HeaderContacts"
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
      <HeaderContacts />
      {/* </div> */}
    </header>
  )
}

export default Header