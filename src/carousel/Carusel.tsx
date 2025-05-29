// Carusel
import "./carusel.scss"
import useEmblaCarousel from 'embla-carousel-react'
import pionRoses from "../assets/example-bouquets/0.jpg"
import hriza from "../assets/example-bouquets/1.jpg"
import pions from "../assets/example-bouquets/2.jpg"
import rosesMiks from "../assets/example-bouquets/3.jpg"
import hrizaBaltika from "../assets/example-bouquets/4.jpg"
import firdusik from "../assets/example-bouquets/5.jpg"
import BouquetCard from "../bouquetCard/BouquetCard"
import CaruselArrows from "../caruselArrows/CaruselArrows"

// букеты как то с сервака подгружать же надо в итоге
const products = [
  { id: 1, name: 'пионовидные розы', photo: pionRoses },
  { id: 2, name: "Хризантемы", photo: hriza },
  { id: 3, name: "Пионы", photo: pions },
  { id: 4, name: "Розы микс", photo: rosesMiks },
  { id: 5, name: "Хризантемы Балтика", photo: hrizaBaltika },
  { id: 6, name: "Микс Фирдусик", photo: firdusik },
];

const Carusel = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className='carusel'>
      <h2 className="carusel__title">Наши букеты</h2>
      <div className="carusel__wrapper" ref={emblaRef}>
        <div className="carusel__bouquets">

          {products.map(it => <BouquetCard key={it.id} name={it.name} photo={it.photo}/>)}

        </div>
      </div>
      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext}/>
    </div>
  )
  
}

export default Carusel
