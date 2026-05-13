// OrderPage.tsx
import OrderForm from "@components/orderForm/OrderForm";
import { type Location, useLocation, useNavigate } from "react-router-dom";

type OrderPageLocationState = {
  backgroundLocation?: Location;
  bouquetName?: string;
  watchField?: boolean;
  scrollY?: number;
  modalUrl?: string;
};

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as OrderPageLocationState | null;

  const handleClose = () => {
    const modalUrl = state?.modalUrl ?? "/";
    const scrollY = state?.scrollY ?? 0;
    const backgroundLocation = state?.backgroundLocation;

    navigate(modalUrl, {
      state: backgroundLocation ? { backgroundLocation } : undefined,
    });

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
