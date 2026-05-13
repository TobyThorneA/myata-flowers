interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage = ({ onClose }: SuccessMessageProps) => {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-bg-card p-6 text-center shadow-xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold text-color-text hover:text-color-action"
        >
          ×
        </button>
        <h2 className="text-mint-700 mb-4 font-cursive text-2xl font-bold md:text-3xl">Спасибо!</h2>
        <p className="mb-6 text-sm text-color-text md:text-base">
          Мы свяжемся с вами в ближайшее время 😊
        </p>
        <button
          onClick={onClose}
          className="hover:bg-mint-700 rounded-xl bg-color-action px-6 py-3 font-semibold text-white transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
