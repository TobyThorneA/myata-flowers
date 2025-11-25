import useEmblaCarousel from "embla-carousel-react";
import CaruselArrows from "../caruselArrows/CaruselArrows";
import ReviewsExamles, { reviewsExample } from "./ReviewsExamles";

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="bg-bg-collor pb-4" id="reviews">
      <div className="mx-8 my-4 relative md:mt-6 lg:mt-8">

        <h2 className="py-2 text-center font-semibold text-xl">Отзывы</h2>

        <div className="flex flex-col text-center mb-4 items-center">
  <p className="text-[14px] max-w-[700px]">
    Мы гордимся реальными отзывами на площадке Авито, которые подтверждают нашу репутацию.
  </p>

  <a
    href="https://www.avito.ru/brands/myata//all?sellerId=93c75d7c8a25a5154afa63c278765e44"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 w-full flex justify-center"
  >
    <button className="border border-black bg-color-action text-white rounded-xl w-[90%] h-[30px] font-bold md:w-[400px]">
      Посмотреть отзывы
    </button>
  </a>
</div>


        {/* Карусель */}
        <div ref={emblaRef} className="overflow-hidden -mx-8 mb-4">
          <div className="flex will-change-transform">
            {reviewsExample.map((review) => (
              <ReviewsExamles
                key={review.id}
                name={review.name} />
            ))}
          </div>

          <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
