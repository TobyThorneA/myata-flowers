// Carusel
import "./carusel.scss"
import useEmblaCarousel from 'embla-carousel-react'
import BouquetCard from "../bouquetCard/BouquetCard"
import CaruselArrows from "../caruselArrows/CaruselArrows"
import { bouquets, type Bouquet } from "../mocks/productsData"
import { useLocation, useNavigate } from "react-router-dom"


const Carusel = () => {

  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

  const location = useLocation()
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleOpenModal = (bouquet: Bouquet) => {
    navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } }); // рисуем модалку поверх карусели
  };



  return (
    <div className='carusel'>
      <h2 className="carusel__title">Наши букеты</h2>
      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets">

          {bouquets.map(it => <BouquetCard 
            key={it._id} 
            name={it.name} 
            price={it.price} 
            oldPrice={it.oldprice} 
            photo={it.images[0]}
            handleOpenModal={() => handleOpenModal(it)}
            />
          )}

        </div>
      </div>
      <CaruselArrows 
        onPrev={scrollPrev} 
        onNext={scrollNext}
      />

    </div>
  )
  
}

export default Carusel
