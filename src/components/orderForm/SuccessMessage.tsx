interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage = ({ onClose }: SuccessMessageProps) => {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-bg-card rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-color-text text-2xl font-bold hover:text-color-action"
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl font-cursive font-bold text-mint-700 mb-4">Спасибо!</h2>
        <p className="text-color-text text-sm md:text-base mb-6">Мы свяжемся с вами в ближайшее время 😊</p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-color-action text-white rounded-xl font-semibold hover:bg-mint-700 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;