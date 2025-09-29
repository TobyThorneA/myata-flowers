interface closeButtonProps {
  handleClose: () => void
}

const CloseButton = ({handleClose} : closeButtonProps) => {
  return (
    <button
      onClick={handleClose}
      aria-label="Закрыть окно"
      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-color-icons text-white flex items-center justify-center hover:bg-color-action transition-colors shadow-md z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
export default CloseButton