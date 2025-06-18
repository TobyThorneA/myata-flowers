// PromoKazanDelivery.tsx
import { useState } from 'react';
import './PromoKazanDelivery.scss';
import OrderForm from '../../orderForm/OrderForm';
import { freeDeliveryPromoBouquets, type Bouquet } from '../../mocks/productsData';
import BouquetModal from '../../bouquetModal/BouquetModal';
import logo from "../../assets/logo.jpg"
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const PromoKazanDelivery = () => {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingBouquet, setViewingBouquet] = useState<Bouquet | null>(null);

  // Универсальная функция для отправки целей в промо-счетчик (102654832)
  const sendPromoMetricaGoal = (goalName: string, params?: object) => {
    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(102654832, 'reachGoal', goalName, params);
        console.log(`[Промо-Метрика] Отправлено: ${goalName}`, params);
      } catch (e) {
        console.error('Ошибка отправки цели:', e);
      }
    } else {
      console.warn('Метрика не загружена!');
    }
  };

  // Обработчик клика по основной кнопке
  const handleCtaClick = () => {
    sendPromoMetricaGoal('promo_cta_click');
    setIsFormOpen(true);
  };

  // Обработчик выбора букета
  const handleSelect = (bouquet: Bouquet) => {
    sendPromoMetricaGoal('promo_bouquet_select', {
      bouquetName: bouquet.name,
      bouquetPrice: bouquet.price
    });
    setSelectedBouquet(bouquet);
    setIsFormOpen(true);
  };

  // Обработчик просмотра букета
  const handleViewBouquet = (bouquet: Bouquet) => {
    sendPromoMetricaGoal('promo_bouquet_view', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name
    });
    setViewingBouquet(bouquet);
  };

  return (
    <div className="promo-page">
      {/* Шапка промо-лендинга */}
      <header className="promo-header">
        <div className='promo-header__logo'>
          <img src={logo} alt="логотип" />
        </div>
        <div className="promo-header__content">
          <h1>Бесплатная доставка по Казани!</h1>
          <p>Выберите один из трех премиальных букетов со скидкой 20%</p>
          <div className="promo-badge">
              <span>Акция действует до 30 июня</span>
          </div>
          {/* <Link to={'/order'}> главная</Link> */}
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
              onClick={() => handleViewBouquet(bouquet)}
              // onClick={() => setViewingBouquet(bouquet)}
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