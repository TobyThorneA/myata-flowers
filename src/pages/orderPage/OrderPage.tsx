// OrderPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '@components/orderForm/OrderForm';

interface LocationState {
  backgroundLocation?: { pathname: string };
}

const OrderPage = () => {
    const location = useLocation();
    const backgroundLocation = (location.state as LocationState)?.backgroundLocation;

    const handleClose = () => {
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      navigate('/', { replace: true });
    }
  };
  const navigate = useNavigate();
  return (
    <div >
      <OrderForm onClose={() => handleClose()} />
     </div>
  );
};

export default OrderPage;
