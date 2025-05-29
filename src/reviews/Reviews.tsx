import "./reviews.scss"
import useEmblaCarousel from 'embla-carousel-react'
import one0 from "../assets/reviews/anastasiya.jpg"
import one1 from "../assets/reviews/artem.jpg"
import one2 from "../assets/reviews/elena.jpg"
import one3 from "../assets/reviews/lyaisan.jpg"
import CaruselArrows from "../caruselArrows/CaruselArrows"

const Reviwes = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="reviews">
      <div className="reviews__wrapper">
        <h3 className="reviews__title">Отзывы</h3>
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