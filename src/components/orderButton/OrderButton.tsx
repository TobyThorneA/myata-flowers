import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import OrderForm from '@components/orderForm/OrderForm';

interface OrderButtonProps {
  popup?: boolean;
  watchField?: boolean;
  bouquetName?: string;
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
    window.ym?.(102322325, 'click_order_button');
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

      <button
        onClick={handleClick}
        className="
          w-full max-w-[500px] 
          px-4 py-3 
          text-white text-sm md:text-base font-semibold 
          rounded-lg 
          bg-gradient-to-br from-[#67A799] to-[#174142] 
          transition-all duration-300 ease-in-out
          hover:from-[#174142] hover:to-[#67A799]
          hover:-translate-y-[2px]
          hover:shadow-lg
          active:translate-y-0
        "
      >
        {contextNameButton}
      </button>
    </>
  );
};

export default OrderButton;

