//carousel/Carusel.tsx
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";
import LastCard from "@components/lastCard/LastCard";
import type { IBouquet } from "@pages/admin/types";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { selectBouquetsByCategory } from "@store/selectors/bouquetSelectors";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BOUQUET_CATEGORIES } from "../../shared/categories/config/bouquetCategories";
import CaruselArrows from "../caruselArrows/CaruselArrows";

const Carusel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const dispatch = useAppDispatch();
  const specBouquets = useAppSelector((state) =>
    selectBouquetsByCategory(state, BOUQUET_CATEGORIES.POP.key),
  );

  // конкатенация и удаление дубликатов
  const bouquets = [...new Map([...specBouquets].map((b) => [b._id, b])).values()];

  const navigate = useNavigate();
  const location = useLocation();

  // sort
  const sortedAsc = [...bouquets].sort((a, b) => a.price - b.price);

  useEffect(() => {
    dispatch(fetchBouquetsByCategoryThunk(BOUQUET_CATEGORIES.POP.key));
  }, [dispatch]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, "reachGoal", "bouquet_view", {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    navigate(`/bouquet/${bouquet._id}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className="relative mt-10 px-4 md:mt-5 md:px-12">
      <div className="mb-6 text-center">
        <h2 className="font-cursive text-3xl font-bold text-color-text md:text-4xl">Популярное</h2>
        <p className="mt-1 text-base text-color-icons md:text-lg">Часто выбирают в Казани 🌸</p>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-color-action" />
      </div>

      <div
        className="no-scrollbar -mx-4 overflow-hidden overflow-y-hidden pb-8 pt-3 md:-mx-12"
        ref={emblaRef}
      >
        <div className="flex gap-4 px-4 pb-4 md:px-12">
          {sortedAsc.map((bouquet) => (
            // {bouquets.map((bouquet) => (
            <div
              key={bouquet._id}
              className="w-[70%] flex-shrink-0 transition-transform duration-300 sm:w-[30%] md:w-[270px]"
            >
              <BouquetCardCompact bouquet={bouquet} onClick={() => handleViewBouquet(bouquet)} />
            </div>
          ))}
          <div className="w-[70%] flex-shrink-0 transition-transform duration-300 sm:w-[30%] md:w-[270px]">
            <LastCard nameNav={() => navigate("/catalog")} />
          </div>
        </div>
      </div>
      <CaruselArrows onPrev={scrollPrev} onNext={scrollNext} />
    </div>
  );
};

export default Carusel;
