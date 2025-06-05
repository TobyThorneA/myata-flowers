import Header from '../header/Header'
import './App.scss'
import Carusel from '../carousel/Carusel'
import DeliveryDicoration from '../delivery-and-dicoration/DeliveryDicoration'
import Reviwes from '../reviews/Reviews'
import OrderBottom from '../orderBottom/OrderBottom'
import ProductDescription from '../productDescription/ProductDescription'

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Carusel/>
      <ProductDescription/>
      <DeliveryDicoration/>
      <Reviwes />
      <OrderBottom />
    </div>
  )
}

export default App
