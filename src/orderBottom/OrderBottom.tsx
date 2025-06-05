import OrderButton from '../orderButton/OrderButton'
import './orderBottom.scss'

const OrderBottom = () => {
  return (
    <div className="order-bottom">
      <h2>Закажите букет прямо сейчас</h2>
      <p>Подарите радость близким! Заполните форму обратной связи или позвоните нам — 
        мы поможем подобрать идеальный букет и организуем быструю доставку.
      </p>
      <OrderButton/>
    </div>
  )
}

export default OrderBottom