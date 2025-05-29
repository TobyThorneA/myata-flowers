import Header from '../header/Header'
import './App.scss'
// import example from "../assets/example.png"
import Carusel from '../carousel/Carusel'
import DeliveryDicoration from '../delivery-and-dicoration/DeliveryDicoration'
import Reviwes from '../reviews/Reviews'
// import Popup from './Popup/Popup'

const App = () => {
  return (
    <div className='container'>
      {/* <Popup /> */}
      <Header/>
      <Carusel/>
      <DeliveryDicoration/>
      <Reviwes />



      {/* <img src={example} alt="" /> */}
    </div>
  )
}

export default App
