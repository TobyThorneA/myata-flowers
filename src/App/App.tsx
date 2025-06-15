import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import BouquetPage from '../bouquetPage/BouquetPage'
import OrderPage from '../orderPage/OrderPage'
import PromoKazanDelivery from '../actions/promoKazanDelivery/PromoKazanDelivery'
import PersonalFloristLanding from '../actions/personalFloristLanding/PersonalFloristLanding'
import FlowerSubscriptionLanding from '../actions/flowerSubscriptionLanding/FlowerSubscriptionLanding'
// import OrderFormShort from '../orderFormShort/OrderFormShort'

const App = () => {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  const backgroundLocation = state?.backgroundLocation

  return (
    <div className="container">
      {/* Основные маршруты (фон) */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/store" element={<MainPage />} />
        <Route path="/store/:bouquetId" element={<BouquetPage />} />
        <Route path="/order" element={<OrderPage />} />
        {/* <Route path="/orderShort" element={<OrderFormShort />} /> */}
        <Route path="/promo" element={<PromoKazanDelivery />} />
        <Route path="/personalFlorist" element={<PersonalFloristLanding />} />
        <Route path="/FlowerSubscription" element={<FlowerSubscriptionLanding />} />
      </Routes>

      {/* Модалки, если есть фон */}
      {backgroundLocation && (
        <Routes>
          <Route path="/store/:bouquetId" element={<BouquetPage />} />
          <Route path="/order" element={<OrderPage  />} />
        </Routes>
      )}
    </div>
  )
}

export default App
