import { useNavigate, useLocation } from 'react-router-dom';
import './orderButton.scss';
import { useState } from 'react';
import OrderForm from '../orderForm/OrderForm';

const OrderButton = ({ popup = false }: { popup?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation(); // <--- Получаем текущий location
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (popup) {
    return (
      <div>
        {isPopupOpen && <OrderForm onClose={() => setIsPopupOpen(false)} />}
        <button className="order-button" onClick={() => setIsPopupOpen(true)}>
          Подобрать букет
        </button>
      </div>
    );
  }

  return (
    <button
      className="order-button"
      onClick={() =>
        navigate('/order', {
          state: { backgroundLocation: location }, // <--- Передаём фон
        })
      }
    >
      Подобрать букет
    </button>
  );
};

export default OrderButton;
