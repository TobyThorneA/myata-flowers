import useEmblaCarousel from "embla-carousel-react";

import CaruselArrows from "../caruselArrows/CaruselArrows";
import ReviewsExamles from "./ReviewsExamles";
import { reviewsExample } from "./reviewsExamplesData";

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="bg-bg-collor pb-4" id="reviews">
      <div className="relative mx-8 my-4 md:mt-6 lg:mt-8">
        <h2 className="py-2 text-center text-xl font-semibold">Отзывы</h2>

        <div className="mb-4 flex flex-col items-center text-center">
          <p className="max-w-[700px] text-[14px]">
            Мы гордимся реальными отзывами на площадке Авито, которые подтверждают нашу репутацию.
          </p>

          <a
            href="https://www.avito.ru/brands/myata//all?sellerId=93c75d7c8a25a5154afa63c278765e44"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full justify-center"
          >
            <button className="h-[30px] w-[90%] rounded-xl border border-black bg-color-action font-bold text-white md:w-[400px]">
              Посмотреть отзывы
            </button>
          </a>
        </div>

        {/* Карусель */}
        <div ref={emblaRef} className="-mx-8 mb-4 overflow-hidden">
          <div className="flex will-change-transform">
            {reviewsExample.map((review) => (
              <ReviewsExamles key={review.id} name={review.name} />
            ))}
          </div>

          <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
