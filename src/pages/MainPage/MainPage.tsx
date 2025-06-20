import Carusel from "@components/carousel/Carusel";
import DeliveryDicoration from "@components/delivery-and-dicoration/DeliveryDicoration";
import Header from "@components/header/Header";
import OrderBottom from "@components/orderBottom/OrderBottom";
import ProductDescription from "@components/productDescription/ProductDescription";
import Reviwes from "@components/reviews/Reviews";

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