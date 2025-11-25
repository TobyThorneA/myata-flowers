// OrderPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '@components/orderForm/OrderForm';

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { 
    bouquetName?: string; 
    watchField?: boolean; 
    scrollY?: number; 
    from?: string;
    modalUrl?: string;
  } | undefined;

  const handleClose = () => {
    // @ts-ignore
    const modalUrl = state?.modalUrl ?? '/';
    // const to = state?.from ?? '/'; // если from нет, fallback на главную
    const scrollY = state?.scrollY ?? 0;
    // navigate(to, { replace: true });
    navigate(modalUrl, { state: { backgroundLocation: state?.from } });

      setTimeout(() => {
      window.scrollTo(0, scrollY);
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
