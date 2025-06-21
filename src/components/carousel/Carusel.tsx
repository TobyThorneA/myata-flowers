// // Carusel.tsx
// import "./carusel.scss";
// import useEmblaCarousel from 'embla-carousel-react';
// import CaruselArrows from "../caruselArrows/CaruselArrows";
// import { bouquets, type Bouquet } from "../../mocks/productsData";
// import { useLocation, useNavigate } from "react-router-dom";

// const Carusel = () => {
//   const navigate = useNavigate();
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
//   const location = useLocation();

//   const scrollPrev = () => emblaApi?.scrollPrev();
//   const scrollNext = () => emblaApi?.scrollNext();

//   const handleOpenModal = (bouquet: Bouquet) => {
//   window.ym?.(102322325, 'reachGoal', 'click_order_button');
//   navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } });
// };

//   return (
//     <div className='carusel'>
//       <h2 className="carusel__title">Наши букеты</h2>
//       <div className="carusel__wrapper" ref={emblaRef}>
//         <div className="carusel__bouquets">
//           {bouquets.map(bouquet => (
//             <div className="bouquet-card" key={bouquet._id}>
//               <div 
//                 className="bouquet-image"
//                 onClick={() => handleOpenModal(bouquet)}
//               >
//                 <img src={bouquet.images[0]} alt={bouquet.name} loading="lazy" />
//               </div>
              
//               <div className="bouquet-details">
//                 <h3>{bouquet.name}</h3>
                
//                 <p className="description">
//                   {bouquet.description && bouquet.description.length > 100 
//                     ? `${bouquet.description.substring(0, 100)}...` 
//                     : bouquet.description}
//                 </p>
                
//                 <div className="price-container">
//                   {bouquet.oldprice > 0 && (
//                     <span className="old-price">{bouquet.oldprice.toLocaleString('ru-RU')}₽</span>
//                   )}
//                   <span className="current-price">{bouquet.price.toLocaleString('ru-RU')}₽</span>
//                 </div>
                
//                 <button 
//                   className="select-button"
//                   onClick={() => handleOpenModal(bouquet)}
//                 >
//                   Выбрать букет
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
//     </div>
//   );
// };

// export default Carusel;

import "./carusel.scss";
import useEmblaCarousel from 'embla-carousel-react';
import CaruselArrows from "../caruselArrows/CaruselArrows";
import { bouquets, type Bouquet } from "../../mocks/productsData";
import { useState } from "react";
import BouquetModal from "../bouquetModal/BouquetModal";
import OrderForm from "../orderForm/OrderForm";
import { useLocation, useNavigate } from "react-router-dom";

const Carusel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [viewingBouquet, setViewingBouquet] = useState<Bouquet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleViewBouquet = (bouquet: Bouquet) => {
    window.ym?.(102322325, 'reachGoal', 'bouquet_view', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    // Навигация с сохранением background для модалки на новой странице
    navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } });
  };

  const handleSelectBouquet = (bouquet: Bouquet) => {
    window.ym?.(102322325, 'reachGoal', 'bouquet_select', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
      bouquetPrice: bouquet.price,
    });
    setSelectedBouquet(bouquet);
    setIsFormOpen(true);
  };

  return (
    <div className="carusel">
      <h2 className="carusel__title">Наши букеты</h2>

      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets">
          {bouquets.map((bouquet) => (
            <div className="bouquet-card" key={bouquet._id}>
              <div
                className="bouquet-image"
                onClick={() => handleViewBouquet(bouquet)}
              >
                <img
                  src={bouquet.images[0]}
                  alt={bouquet.name}
                  loading="lazy"
                />
              </div>

              <div className="bouquet-details">
                <h3>{bouquet.name}</h3>

                <p className="description">
                  {bouquet.description && bouquet.description.length > 100
                    ? `${bouquet.description.substring(0, 100)}...`
                    : bouquet.description}
                </p>

                <div className="price-container">
                  {bouquet.oldprice > 0 && (
                    <span className="old-price">
                      {bouquet.oldprice.toLocaleString("ru-RU")}₽
                    </span>
                  )}
                  <span className="current-price">
                    {bouquet.price.toLocaleString("ru-RU")}₽
                  </span>
                </div>

                <button
                  className="select-button"
                  onClick={() => handleSelectBouquet(bouquet)}
                >
                  Выбрать букет
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />

      {/* Модальное окно просмотра букета по маршруту */}
      {viewingBouquet && (
        <BouquetModal
          bouquet={viewingBouquet}
          onClose={() => setViewingBouquet(null)}
        />
      )}

      {/* Модалка с формой заказа по кнопке */}
      {isFormOpen && selectedBouquet && (
        <OrderForm
          onClose={() => setIsFormOpen(false)}
          bouquetName={selectedBouquet.name}
          hideExtraFields={true}
        />
      )}
    </div>
  );
};

export default Carusel;

