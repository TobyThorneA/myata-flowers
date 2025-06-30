// orderForm
import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./popup.scss";
import { useAppDispatch } from "../../store/app/hook";
import { setBouquetName } from "../../store/slices/orderSlice";
import OrderFormComponent from "./OrderFormComponent";
import SuccessMessage from "./SuccessMessage";
import { usePreventScroll } from "@hooks/usePreventScroll";
import { useOrderForm } from "@hooks/useOrderForm";



interface OrderFormProps {
  onClose: () => void;
  bouquetName?: string;
  hideExtraFields?: boolean;
}

const modalRoot = document.getElementById("modal-root")!;

const OrderForm = ({ onClose, bouquetName, hideExtraFields = false }: OrderFormProps ) => {

  const { isSubmitted, handleFormData, handleSubmit } = useOrderForm(bouquetName);

  const dispatch = useAppDispatch();



    // Добавляем эффект для обновления bouquetName при изменении пропса
  useEffect(() => {
    const finalBouquetName = bouquetName === undefined ? 'Не указан' : bouquetName;
    dispatch(setBouquetName(finalBouquetName));

  }, [bouquetName, dispatch]);

  // Для закрытия скролла на айфоне
  usePreventScroll();

// обработчик esc
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose}>×</button>

        {!isSubmitted ? (
          <OrderFormComponent
            handleFormData={handleFormData}
            handleSubmit={handleSubmit}
            onClose={onClose}
            hideExtraFields={hideExtraFields}
          />
        ) : (
          <SuccessMessage
            onClose={onClose} 
          />
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default OrderForm;
