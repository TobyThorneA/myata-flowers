import { useNavigate, useLocation } from 'react-router-dom';
import './orderButton.scss';
import { useState } from 'react';
import OrderForm from '@components/orderForm/OrderForm';

interface OrderButtonProps {
  popup?: boolean;
  watchField?: boolean;
  bouquetName?: string; // Добавляем необязательное имя букета
  contextNameButton?: string;
}

const OrderButton = ({
  popup = false,
  bouquetName,
  contextNameButton = 'Подобрать букет',
  watchField = false
}: OrderButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    window.ym?.(102322325, 'reachGoal', 'click_order_button');
    if (popup) {
      setIsPopupOpen(true);
    } else {
      navigate('/order', { state: { backgroundLocation: location } });
    }
  };

  return (
    <>
      {popup && isPopupOpen && (
        <OrderForm
          onClose={() => setIsPopupOpen(false)}
          bouquetName={bouquetName}
          hideExtraFields={watchField}
        />
      )}

      <button className="order-button" onClick={handleClick}>
        {contextNameButton}
      </button>
    </>
  );
};


export default OrderButton;
