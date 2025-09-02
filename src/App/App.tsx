import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import MainPage from '@pages/MainPage/MainPage';
import OrderPage from '@pages/orderPage/OrderPage';
import CatalogPage from '@pages/catalogPage/catalogPage';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import FavoritesPage from '@pages/favoritesPage/FavoritesPage';
import PromoPage from '@pages/promoPage/PromoPage';
import NotFoundPage from '@pages/notFoundPage/NotFounPage';
import AboutUs from '@pages/aboutUsPage/AboutPage';
import ContactPage from '@pages/contactPage/ContactPage';
import DeliveryMethodsPage from '@pages/deliveryMethodsPage/DeliveryMethodPage';
import PaymentPage from '@pages/paymentPage/PaymentPage';
import WarrantyPage from '@pages/warrantyPage/WarrantyPage';
import PrivacyPolicyPage from '@pages/privacyPolicyPage/PrivacyPolicyPage';
import AdminLogin from '@pages/admin/AdminLogin';
import Dashboard from '@pages/admin/AdminDashboard';

import { useAppDispatch } from '@store/app/hook';
import { fetchBouquetsThunk } from '@store/slices/bouquetSlice';

import PrivateRouteCustom from '@components/privateRouteCustom/privateRouteCustom';
import DesctopMenu from '@components/Header/DesctopMenu';
import BouquetModal from '@components/bouquetModal/BouquetModal';

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;
  const dispatch = useAppDispatch();

  const isAdminRoute = location.pathname.startsWith('/admin/');

  // backgroundLocation — если была программная навигация (navigate(...))
  // Определяем, нужно ли рендерить модалку:
  // const isModal = backgroundLocation !== undefined || location.pathname.match(/\/(\w+\/)?\w{24}$/); //Проверка \w{24} — это ID букета из MongoDB.

  // Паттерн для MongoDB ObjectId: 24 символа, hex
  const bouquetIdPattern = /^[a-f0-9]{24}$/i;

  const isModal = 
    (backgroundLocation !== undefined && bouquetIdPattern.test(location.pathname.split('/').pop() ?? ''))
    || bouquetIdPattern.test(location.pathname.split('/').pop() ?? '');

  useEffect(() => {
    dispatch(fetchBouquetsThunk());
  }, [dispatch]);

  return (
    <div className="container">
      {!isAdminRoute && <Header />}

      <Routes location={backgroundLocation || location}>
  <Route path="/" element={<MainPage />} />
  <Route path="/store" element={<MainPage />} />
  <Route path="/order" element={<OrderPage />} />

  {/* Каталог */}
  <Route path="/catalog" element={<CatalogPage />} />
  <Route path="/catalog/:category" element={<CatalogPage />} />
  <Route path="/catalog/:category/:bouquetId" element={<CatalogPage />} />

  {/* Избранное */}
  <Route path="/favorites" element={<FavoritesPage />} />

  {/* Акции */}
  <Route path="/promo" element={<PromoPage />} />

  {/* Прямые ссылки на букеты (вне каталога) */}
  <Route path="/bouquet/:bouquetId" element={<BouquetModal />} />

  {/* Главная страница — тут сделаем универсальный маршрут для модалки */}
  <Route path="/:bouquetId" element={<MainPage />} />

  {/* Остальные страницы */}
  <Route path="/about" element={<AboutUs />} />
  <Route path="/contacts" element={<ContactPage />} />
  <Route path="/delivery" element={<DeliveryMethodsPage />} />
  <Route path="/payment" element={<PaymentPage />} />
  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
  <Route path="/warranty" element={<WarrantyPage />} />

  {/* Админ */}
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={
    <PrivateRouteCustom>
      <>
        <DesctopMenu />
        <Dashboard />
      </>
    </PrivateRouteCustom>
  } />

  <Route path="*" element={<NotFoundPage />} />
</Routes>

{/* Модалки поверх, для всех вариантов */}
{backgroundLocation && (
  <Routes>
    <Route path="/catalog/:category/:bouquetId" element={<CatalogPage />} />
    <Route path="/promo/:bouquetId" element={<PromoPage />} />
    <Route path="/favorites/:bouquetId" element={<FavoritesPage />} />
    <Route path="/:bouquetId" element={<MainPage />} />
  </Routes>
)}

{isModal && (
  <Routes >
    <Route path="/catalog/:category/:id" element={<BouquetModal />} />
    <Route path="/promo/:id" element={<BouquetModal />} />
    <Route path="/favorites/:id" element={<BouquetModal />} />
    <Route path="/bouquet/:id" element={<BouquetModal />} />  {/* вот сюда */}
    <Route path="/:id" element={<BouquetModal />} />
  </Routes>
)}


      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
