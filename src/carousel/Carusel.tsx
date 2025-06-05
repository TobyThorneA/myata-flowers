// Carusel
import "./carusel.scss"
import useEmblaCarousel from 'embla-carousel-react'
import BouquetCard from "../bouquetCard/BouquetCard"
import CaruselArrows from "../caruselArrows/CaruselArrows"
import { useState } from "react"
import BouquetModal from "../BouquetModal/BouquetModal"
import { products, type Bouquet } from "../mocks/productsData"


const Carusel = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedBouquet, setSelectedBouquet] = useState<null | Bouquet>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleOpenModal = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className='carusel'>
      <h2 className="carusel__title">Наши букеты</h2>
      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets">

          {products.map(it => <BouquetCard 
            key={it.id} 
            name={it.name} 
            price={it.price} 
            oldPrice={it.oldPrice} 
            photo={it.photos[0]}
            handleOpenModal={() => handleOpenModal(it)}
            />
          )}

        </div>
      </div>
      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext}/>

      {/* Рендерим модалку, если она открыта и есть выбранный букет */}
      {isModalOpen && selectedBouquet && (
        <BouquetModal
          bouquet={selectedBouquet} 
          onClose={handleCloseModal} 
        />
      )}

    </div>
  )
  
}

export default Carusel
