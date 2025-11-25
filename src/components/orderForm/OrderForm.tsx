// orderForm
import { useAppDispatch } from '../../store/app/hook';
import { setBouquetName } from '../../store/slices/orderSlice';
import OrderFormComponent from './OrderFormComponent';
import SuccessMessage from './SuccessMessage';
import { usePreventScroll } from '@hooks/usePreventScroll';
import { useOrderForm } from '@hooks/useOrderForm';
import { useEffect } from 'react';

interface OrderFormProps {
  onClose: () => void;
  bouquetName?: string;
  hideExtraFields?: boolean;
}

const OrderForm = ({ onClose, bouquetName, hideExtraFields = false }: OrderFormProps) => {
  const { isSubmitted, handleFormData, handleSubmit } = useOrderForm(bouquetName);
  const dispatch = useAppDispatch();

  // Устанавливаем название букета
  useEffect(() => {
    const finalBouquetName = bouquetName ?? 'Не указан';
    dispatch(setBouquetName(finalBouquetName));
  }, [bouquetName, dispatch]);

  // Для закрытия скролла на iOS
  usePreventScroll();

  // Esc закрывает форму
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="order-page-container p-6 md:p-8 max-w-lg mx-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-color-text text-2xl font-bold hover:text-color-action"
      >
        ×
      </button>

      {/* {!isSubmitted ? (
        <OrderFormComponent
          handleFormData={handleFormData}
          handleSubmit={handleSubmit}
          onClose={onClose}
          hideExtraFields={hideExtraFields}
        />
      ) : (
        <SuccessMessage onClose={onClose} />
      )} */}

      {!isSubmitted ? (
        <OrderFormComponent
          handleFormData={handleFormData}
          handleSubmit={handleSubmit}
          onClose={onClose}
          hideExtraFields={hideExtraFields}
        />
      ) : (
        <SuccessMessage onClose={onClose} />
      )}
    </div>
  );
};

export default OrderForm;
