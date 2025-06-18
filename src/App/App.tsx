import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import BouquetPage from '../bouquetPage/BouquetPage';
import OrderPage from '../orderPage/OrderPage';
import PromoKazanDelivery from '../actions/promoKazanDelivery/PromoKazanDelivery';
import PersonalFloristLanding from '../actions/personalFloristLanding/PersonalFloristLanding';
import FlowerSubscriptionLanding from '../actions/flowerSubscriptionLanding/FlowerSubscriptionLanding';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

// Компонент для отслеживания основной метрики
function TrackMainMetrica() {
  const location = useLocation();

  useEffect(() => {
    if (window.ym && !location.pathname.includes('/promo')) {
      window.ym(102322325, 'hit', window.location.href, {
        title: document.title,
        referer: document.referrer
      });
    }
  }, [location.pathname]);

  return null;
}

// Компонент для отслеживания промо-метрики
function TrackPromoMetrica() {
  const location = useLocation();

  useEffect(() => {
    if (window.ym && location.pathname.includes('/promo')) {
      window.ym(102654832, 'hit', window.location.href, {
        title: document.title,
        referer: document.referrer
      });
    }
  }, [location.pathname]);

  return null;
}

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <div className="container">
      <TrackMainMetrica />
      <TrackPromoMetrica />
      
      {/* Основные маршруты */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/store" element={<MainPage />} />
        <Route path="/store/:bouquetId" element={<BouquetPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/promo" element={<PromoKazanDelivery />} />
        <Route path="/personalFlorist" element={<PersonalFloristLanding />} />
        <Route path="/FlowerSubscription" element={<FlowerSubscriptionLanding />} />
      </Routes>

      {/* Модалки */}
      {backgroundLocation && (
        <Routes>
          <Route path="/store/:bouquetId" element={<BouquetPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
