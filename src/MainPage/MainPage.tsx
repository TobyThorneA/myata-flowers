import Carusel from "../carousel/Carusel";
import DeliveryDicoration from "../delivery-and-dicoration/DeliveryDicoration";
import Header from "../header/Header";
import OrderBottom from "../orderBottom/OrderBottom";
import ProductDescription from "../productDescription/ProductDescription";
import Reviwes from "../reviews/Reviews";

const MainPage = () => {

  return (
    <div className='container'>
      <Header />
      <Carusel />
      <ProductDescription />
      <DeliveryDicoration />
      <Reviwes />
      <OrderBottom />
    </div>
  );
};

export default MainPage;