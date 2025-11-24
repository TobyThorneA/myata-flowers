
// OrderPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '@components/orderForm/OrderForm';

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { bouquetName?: string; watchField?: boolean; scrollY?: number; form?: string } | undefined;

const handleClose = () => {
  // @ts-ignore
   const to = state?.form ?? '/'; // если from нет, fallback на главную
   const y = state?.scrollY ?? 0;
  navigate(to, { replace: true });

    setTimeout(() => {
    window.scrollTo(0, y);
  }, 250);

};

  return (
    <div className="page-container">
      <OrderForm
        onClose={handleClose}
        bouquetName={state?.bouquetName}
        hideExtraFields={state?.watchField ?? false}
      />
    </div>
  );
};

export default OrderPage;
