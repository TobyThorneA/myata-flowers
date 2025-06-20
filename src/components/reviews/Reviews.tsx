import "./reviews.scss"
import useEmblaCarousel from 'embla-carousel-react'
import one0 from "../../assets/reviews/anastasiya.jpg"
import one1 from "../../assets/reviews/artem.jpg"
import one2 from "../../assets/reviews/elena.jpg"
import one3 from "../../assets/reviews/lyaisan.jpg"
import CaruselArrows from "../caruselArrows/CaruselArrows"

const Reviwes = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="reviews">
      <div className="reviews__wrapper">
        <h2 className="reviews__title">Отзывы</h2>
        <div className="reviews__link-wrapper">
          <p className="reviews__text">Мы гордимся реальными отзывами на площадке Авито, которые подтверждают нашу репутацию. 
          </p>
          <a
            className="reviews__link"
            href="https://www.avito.ru/brands/myata//all?sellerId=93c75d7c8a25a5154afa63c278765e44" 
            target="_blank" 
            rel="noopener noreferrer">
            <button className="reviews__button">Посмотреть отзывы</button>
          </a>
        </div>
        <div className="reviews__carusel" ref={emblaRef}>
          <div className="reviews__container">
            <div className="reviews__slide">
              <img src={one0} alt="" />
            </div>
            <div className="reviews__slide">
              <img src={one1} alt="" />
            </div>
            <div className="reviews__slide">
              <img src={one2} alt="" />
            </div>
            <div className="reviews__slide">
              <img src={one3} alt="" />
            </div>
          </div>
            <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>
      
    </div>
  )
}

export default Reviwes
