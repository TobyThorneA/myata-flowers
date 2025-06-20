interface SucsessMessageProps {
  onClose: () => void;
}

const SuccessMessage = ({onClose} : SucsessMessageProps) => {

  return (
    <div className="popup__success">
      <h2>Спасибо!</h2>
      <p>Мы свяжемся с вами в ближайшее время 😊</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}

export default SuccessMessage