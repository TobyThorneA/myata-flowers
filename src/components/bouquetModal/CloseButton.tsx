interface CloseButtonProps {
  handleClose: () => void;
}

const CloseButton = ({ handleClose }: CloseButtonProps) => {
  return (
    <button
      onClick={handleClose}
      aria-label="Закрыть окно"
      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-color-icons text-white shadow-md transition-colors hover:bg-color-action"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default CloseButton;
