// PromoKazanDelivery.tsx
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './PromoKazanDelivery.scss';
import OrderForm from '../../orderForm/OrderForm';
import { freeDeliveryPromoBouquets, type Bouquet } from '../../mocks/productsData';
import BouquetModal from '../../bouquetModal/BouquetModal';

const PromoKazanDelivery = () => {

  // const bouquetsPromo = bouquets.slice(0,3);
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const navigate = useNavigate();
  
  
  const handleCtaClick = () => {
    // Можно выбрать первый букет из промо или оставить bouquetName как "Не указан"
    // setSelectedBouquet(bouquetsPromo[0]); // или null, если не нужно выбирать букет
    setIsFormOpen(true);
  };

  // Добавим состояние для просмотра букета
const [viewingBouquet, setViewingBouquet] = useState<Bouquet | null>(null);


  const handleSelect = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet);
    setIsFormOpen(true);
  };

  return (
    <div className="promo-page">
      {/* Шапка промо-лендинга */}
      <header className="promo-header">
        <div className="promo-header__content">
          <h1>Бесплатная доставка по Казани!</h1>
          <p>Выберите один из трех премиальных букетов со скидкой 20%</p>
          <div className="promo-badge">
            <span>Акция действует до 30 июня</span>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <section className="promo-benefits">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Бесплатная доставка</h3>
            {/* <p>По всему городу в течение 2-х часов</p> */}
            <p>По всему городу от 30 минут</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎁</div>
            <h3>Помогаем дарить эмоции</h3>
            <p>Трогательная открытка в подарок - передадим ваши теплые слова</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💐</div>
            <h3>Свежие цветы</h3>
            <p>Пришлем фото букета перед отправкой</p>
          </div>
        </div>
      </section>

    <section className="promo-bouquets">
  <div className="container">
    <h2>Выберите ваш букет</h2>
    <p className="subtitle">Букеты которые участвуют в акции с бесплатной доставкой</p>
    
    <div className="bouquets-grid">
      {freeDeliveryPromoBouquets.map(bouquet => (
        <div className="bouquet-card" key={bouquet._id}>
          <div className="card-inner">
            <div 
              className="bouquet-image"
              onClick={() => setViewingBouquet(bouquet)}
            >
              <div className="promo-badge">-20%</div>
              <img 
                src={bouquet.images[0]} 
                alt={bouquet.name} 
                loading="lazy"
              />
            </div>
            
            <div className="bouquet-details">
              <h3>{bouquet.name}</h3>
              
              <div className="description-wrapper">
                <p className="description">
                  {bouquet.description && bouquet.description.length > 100 
                    ? `${bouquet.description.substring(0, 100)}...` 
                    : bouquet.description}
                </p>
              </div>
              
              <div className="price-container">
                <span className="old-price">{bouquet.oldprice.toLocaleString('ru-RU')}₽</span>
                <span className="current-price">{bouquet.price.toLocaleString('ru-RU')}₽</span>
              </div>
              
              <div className="size">{bouquet.size}</div>
              
              <button 
                className="select-button"
                onClick={() => handleSelect(bouquet)}
              >
                Выбрать этот букет
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  {viewingBouquet && (
    <BouquetModal
      bouquet={viewingBouquet}
      onClose={() => setViewingBouquet(null)}
      
    />
  )}
</section>

      {/* CTA секция */}
      <section className="promo-cta">
        <div className="cta-content">
          <h2>Успейте заказать!</h2>
          <p>Оставьте заявку сейчас и получите бесплатную доставку по Казани</p>
          <button 
            className="cta-button"
            onClick={handleCtaClick}
          >
            Заказать с бесплатной доставкой
          </button>
        </div>
      </section>

      {/* Модалка с формой заказа */}
            {isFormOpen && (
        <OrderForm 
          onClose={() => setIsFormOpen(false)}
          bouquetName={selectedBouquet?.name || 'Не указан'}
          watchField
        />
      )}
    </div>
  );
};

export default PromoKazanDelivery;