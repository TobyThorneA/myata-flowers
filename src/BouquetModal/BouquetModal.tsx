// BouquetModal.tsx
import React, { useEffect } from 'react';
import './bouquetModal.scss';
import OrderButton from '../orderButton/OrderButton';

interface BouquetModalProps {
    bouquet: {
    _id: string;
    name: string;
    price: number;
    oldprice: number;
    images: string[];
    description?: string;
    size?: string;
  };
  onClose: () => void;
}

const BouquetModal: React.FC<BouquetModalProps> = ({ bouquet, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === bouquet.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? bouquet.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        
        <div className="modal-photo-section">
          <img 
            src={bouquet.images[currentPhotoIndex]} 
            alt={bouquet.name} 
            className="modal-photo"
            loading="lazy"
          />
          
          {bouquet.images.length > 1 && (
            <div className="photo-navigation">
              <button className="nav-btn prev" onClick={prevPhoto}>&lt;</button>
              <div className="photo-counter">
                {currentPhotoIndex + 1} / {bouquet.images.length}
              </div>
              <button className="nav-btn next" onClick={nextPhoto}>&gt;</button>
            </div>
          )}
          
          <div className="photo-thumbnails">
            {bouquet.images.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Вариант ${index + 1}`}
                className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                onClick={() => setCurrentPhotoIndex(index)}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        
        <div className="modal-info-section">
          <h2 className="modal-title">{bouquet.name}</h2>
          
          <div className="modal-prices">
            {bouquet.oldprice > 0 && (
              <div className="modal-old-price">
                {bouquet.oldprice.toLocaleString('ru-RU')} ₽
              </div>
            )}
            <div className="modal-price">
              {bouquet.price.toLocaleString('ru-RU')} ₽
            </div>
          </div>
          
          {bouquet.size && (
            <div className="modal-size">
              <strong>Размер:</strong> {bouquet.size}
            </div>
          )}
          
          {bouquet.description && (
            <div className="modal-description">
              <strong>Описание:</strong> {bouquet.description}
            </div>
          )}
          
          <div className="modal-contacts">
            <h3>Как заказать:</h3>
            <div className="contact-methods">
              <a href="tel:+79656003600" className="contact-link phone">
                Позвонить: +7 (965) 600-3-600
              </a>
              <a 
                href="https://wa.me/79270387435" 
                className="contact-link whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                Написать в WhatsApp
              </a>
              <a 
                href="https://t.me/myata_flow" 
                className="contact-link telegram"
                target="_blank"
                rel="noreferrer"
              >
                Написать в Telegram
              </a>
            </div>
            
          </div>
          
          {/* <button className="order-button-modal">Заказать обратный звонок</button> */}
          
          <div className="order-page-wrapper">
            <OrderButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BouquetModal;
