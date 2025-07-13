// import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from '@pages/MainPage/MainPage';
import BouquetPage from '../pages/bouquetPage/BouquetPage';
import OrderPage from '../pages/orderPage/OrderPage';
import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hook';
import { fetchBouquets } from '@store/slices/bouquetsSlice';
import CatalogPage from '@pages/catalogPage/catalogPage';
import AdminPanel from '@components/adminPanel/AdminPanel';
import Header from '@components/Header/Header';
// import NavBar from '@components/NavBar/NavBar';
import Footer from '@components/Footer/Footer';
import FavorietsPage from '@pages/favoritesPage/FavoritesPage';
import PromoPage from '@pages/promoPage/PromoPage';
import NotFoundPage from '@pages/notFoundPage/NotFounPage';
import AboutUs from '@pages/aboutUsPage/AboutPage';
import ContactPage from '@pages/contactPage/ContactPage';
import DeliveryMethodsPage from '@pages/deliveryMethodsPage/DeliveryMethodPage';
import PaymentPage from '@pages/paymentPage/PaymentPage';
import WarrantyPage from '@pages/warrantyPage/WarrantyPage';
import PrivacyPolicyPage from '@pages/privacyPolicyPage/PrivacyPolicyPage';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

// Компонент для отслеживания основной метрики
function TrackYandexMetrica() {
  const location = useLocation();

  useEffect(() => {
    window.ym?.(102322325, 'hit', window.location.href, {
      title: document.title,
      referer: document.referrer,
    });
  }, [location.pathname]);

  return null;
}



const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
  dispatch(fetchBouquets());
}, [dispatch]);

  return (
    <div className="container">
      <TrackYandexMetrica />
      <Header />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/:bouquetId" element={<BouquetPage />} /> */}
        <Route path="/store" element={<MainPage />} />
        {/* <Route path="/store/:bouquetId" element={<BouquetPage />} /> */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        {/* <Route path="/catalog/:bouquetId" element={<BouquetPage />} /> */}
        <Route path="/promo" element={<PromoPage />} />
        {/* <Route path="/promo/:bouquetId" element={<BouquetPage />} /> */}
        <Route path="/favorites" element={<FavorietsPage />} />
        {/* <Route path="favoriets/:bouquetId" element={<BouquetPage />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/delivery" element={<DeliveryMethodsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/1" element={<AdminPanel />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Модалки */}
      {backgroundLocation && (
        <Routes>
          <Route path="/:bouquetId" element={<BouquetPage />} />
          <Route path="/store/:bouquetId" element={<BouquetPage />} />
          <Route path="/catalog/:bouquetId" element={<BouquetPage />} />
          <Route path="/promo/:bouquetId" element={<BouquetPage />} />
          <Route path="/favorites/:bouquetId" element={<BouquetPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      )}
      <Footer />
      {/* <NavBar />  */}
    </div>
  );
};

export default App;
