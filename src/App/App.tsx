import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import BouquetPage from '../bouquetPage/BouquetPage'
import OrderPage from '../orderPage/OrderPage'

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
