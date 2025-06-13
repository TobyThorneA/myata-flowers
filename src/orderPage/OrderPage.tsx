// OrderPage.tsx
import { useNavigate } from 'react-router-dom';
import OrderForm from '../orderForm/OrderForm';

const OrderPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <OrderForm onClose={() => navigate(-1)} />
    </div>
  );
};

export default OrderPage;
