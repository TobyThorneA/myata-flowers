import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PromoKazanDelivery.scss';
import OrderForm from '@components/orderForm/OrderForm';
import { freeDeliveryPromoBouquets, type Bouquet } from '../../mocks/productsData';
import BouquetModal from '../bouquetModal/BouquetModal';
import Header from '@components/header/Header';
import BouquetCardCompact from '@components/BouquetCardCompact/BouquetCardCompact';

const PromoKazanDelivery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sendGoal = (baseGoalName: string, params?: object) => {
    const isPromo = window.location.pathname.includes("/promo");
    const goal = isPromo ? `promo_${baseGoalName}` : baseGoalName;

    window.ym?.(102322325, "reachGoal", goal, params);
    console.log(`[Метрика] Цель отправлена: ${goal}`, params);
  };

  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingBouquet, setViewingBouquet] = useState<Bouquet | null>(null);

  // При клике на картинку — показываем модалку с букетом (маршрутизация тоже есть)
  const handleViewBouquet = (bouquet: Bouquet) => {
    sendGoal('bouquet_view', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name
    });
    navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } });
  };

  // При клике на CTA "Заказать с бесплатной доставкой" — открываем форму с полной версией (все поля)
  const handleCtaClick = () => {
    sendGoal("cta_click");
    setSelectedBouquet(null); // сброс, т.к. букет не выбран, показываем полный вариант формы
    setIsFormOpen(true);
  };

  return (
    <>
      <Header />
      <div className="promo-page">
        <section className="promo-bouquets">
          <div className="container">
            <h2>Выберите ваш букет с бесплатной доставкой!</h2>
            {/* <p className="subtitle">Букеты которые участвуют в акции с бесплатной доставкой</p> */}

            <div className="bouquets-grid" id='catalog'>
              {freeDeliveryPromoBouquets.map(bouquet => (
                <BouquetCardCompact
                  key={bouquet._id} 
                  bouquet={bouquet}
                  onClick={() => handleViewBouquet(bouquet)}
                  badge='-20%'
                />
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
            hideExtraFields={!!selectedBouquet}  // если букет выбран — скрываем доп. поля (т.е. два поля), иначе показываем все
          />
        )}
      </div>
    </>
  );
};

export default PromoKazanDelivery;

