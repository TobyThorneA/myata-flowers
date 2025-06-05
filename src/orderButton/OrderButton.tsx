import { useEffect, useState } from 'react';
import './orderButton.scss'
import Popup from '../App/Popup/Popup';


const OrderButton = () => {

      const [isPopupOpen, setIsPopupOpen] = useState(false);
        useEffect(() => {
        if (isPopupOpen) {
          document.body.classList.add('popup-open');
        } else {
          document.body.classList.remove('popup-open');
        }
      }, [isPopupOpen]);
  
      const openPopup = () => setIsPopupOpen(true);
      const closePopup = () => setIsPopupOpen(false);

  return (
    
    <div>
      {isPopupOpen && <Popup onClose={closePopup}/>}
      <button className="order-button" onClick={() => openPopup()}>
      
      Подобрать букет
    </button>
    </div>
  )
}

export default OrderButton