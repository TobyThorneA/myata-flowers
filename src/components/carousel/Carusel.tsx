import "./carusel.scss";
import useEmblaCarousel from 'embla-carousel-react';
import CaruselArrows from "../caruselArrows/CaruselArrows";
import { type Bouquet } from "../../mocks/productsData";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/app/hook";
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";

const Carusel = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const bouquets = useAppSelector(state => state.bouquets.items);



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

  return (
    <div className="carusel">
      <h2 className="carusel__title">Наши букеты</h2>

      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets" id="catalog">
          {bouquets.map((bouquet) => (
            <div className="carusel__slide" key={bouquet._id}>
              <BouquetCardCompact
                bouquet={bouquet}
                onClick={() => handleViewBouquet(bouquet)}
              />
            </div>
          ))}
        </div>
      </div>
      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
    </div>
  );
};

export default Carusel;

