
import { useLocation, useNavigate } from 'react-router-dom';

interface OrderButtonProps {
  bouquetName?: string;
  contextNameButton?: string;
  watchField?: boolean;
}

const OrderButton = ({
  bouquetName,
  contextNameButton = 'Подобрать букет',
  watchField = false,
}: OrderButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    window.ym?.(102322325, 'click_order_button');
    const scrollY = window.scrollY;
    navigate('/order', { state: { bouquetName, watchField, scrollY, form:location.pathname } });
  };

  return (
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
  );
};

export default OrderButton;