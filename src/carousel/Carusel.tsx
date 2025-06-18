// // Carusel
// import "./carusel.scss"
// import useEmblaCarousel from 'embla-carousel-react'
// import BouquetCard from "../bouquetCard/BouquetCard"
// import CaruselArrows from "../caruselArrows/CaruselArrows"
// import { bouquets, type Bouquet } from "../mocks/productsData"
// import { useLocation, useNavigate } from "react-router-dom"


// const Carusel = () => {

//   const navigate = useNavigate();
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

//   const location = useLocation()
//   const scrollPrev = () => emblaApi?.scrollPrev();
//   const scrollNext = () => emblaApi?.scrollNext();

//   const handleOpenModal = (bouquet: Bouquet) => {
//     navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } }); // рисуем модалку поверх карусели
//   };



//   return (
//     <div className='carusel'>
//       <h2 className="carusel__title">Наши букеты</h2>
//       <div className="carusel__wrapper" ref={emblaRef}>
//         <div className="carusel__bouquets">

//           {bouquets.map(it => <BouquetCard 
//             key={it._id} 
//             name={it.name} 
//             price={it.price} 
//             oldPrice={it.oldprice} 
//             photo={it.images[0]}
//             handleOpenModal={() => handleOpenModal(it)}
//             />
//           )}

//         </div>
//       </div>
//       <CaruselArrows 
//         onPrev={scrollPrev} 
//         onNext={scrollNext}
//       />

//     </div>
//   )
  
// }

// export default Carusel

// Carusel.tsx
import "./carusel.scss";
import useEmblaCarousel from 'embla-carousel-react';
import CaruselArrows from "../caruselArrows/CaruselArrows";
import { bouquets, type Bouquet } from "../mocks/productsData";
import { useLocation, useNavigate } from "react-router-dom";

const Carusel = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const location = useLocation();

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleOpenModal = (bouquet: Bouquet) => {
    navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className='carusel'>
      <h2 className="carusel__title">Наши букеты</h2>
      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets">
          {bouquets.map(bouquet => (
            <div className="bouquet-card" key={bouquet._id}>
              <div 
                className="bouquet-image"
                onClick={() => handleOpenModal(bouquet)}
              >
                <img src={bouquet.images[0]} alt={bouquet.name} loading="lazy" />
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
                    <span className="old-price">{bouquet.oldprice.toLocaleString('ru-RU')}₽</span>
                  )}
                  <span className="current-price">{bouquet.price.toLocaleString('ru-RU')}₽</span>
                </div>
                
                <button 
                  className="select-button"
                  onClick={() => handleOpenModal(bouquet)}
                >
                  Выбрать букет
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
    </div>
  );
};

export default Carusel;
