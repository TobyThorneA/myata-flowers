import useEmblaCarousel from 'embla-carousel-react'
import CaruselArrows from '../caruselArrows/CaruselArrows'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/app/hook'
import BouquetCardCompact from '@components/BouquetCardCompact/BouquetCardCompact'
import type { IBouquet } from '@pages/admin/types'
import { useEffect } from 'react'
import { fetchBouquetsByCategoryThunk } from '@store/slices/bouquetSlice'
import { selectBouquetsByCategory } from '@store/selectors/bouquetSelectors'
// import { fetchBouquetsByCategoriesThunk } from '@store/slices/bouquetSlice'

const CATEGORY_NAME = "Популярное"  // Название  категории для получения популярных букетов

const Carusel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true })
  const dispatch = useAppDispatch();
  // const bouquets = useAppSelector((state) => state.bouquet.bouquetsByCategory[CATEGORY_NAME] || []);
  const bouquets = useAppSelector(state => selectBouquetsByCategory(state, CATEGORY_NAME));

      useEffect(() => {
      dispatch(fetchBouquetsByCategoryThunk(CATEGORY_NAME));
      // dispatch(fetchBouquetsByCategoriesThunk([CATEGORY_NAME]));
    }, [dispatch]);

  const navigate = useNavigate()
  const location = useLocation()

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, 'reachGoal', 'bouquet_view', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    })
    navigate(`/${bouquet._id}`, { state: { backgroundLocation: location } })
  }

  return (
    <div className="relative px-4 mt-10 md:px-12 md:mt-5">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-color-text">Популярное</h2>
        <p className="text-color-icons mt-1 text-base md:text-lg">Часто выбирают в Казани 🌸</p>
        <div className="w-20 h-1 bg-color-action mx-auto mt-3 rounded-full" />
      </div>

      {/* Убираем overflow-x-auto, вместо него overflow-hidden,
          чтобы браузерный скролл не показывался */}
      <div className="overflow-hidden overflow-y-hidden no-scrollbar pt-3 pb-8 -mx-4 md:-mx-12" ref={emblaRef}>
        <div className="flex gap-4 px-4 md:px-12 pb-4">
          {bouquets.map((bouquet) => (
            <div
              key={bouquet._id}
              className="flex-shrink-0 w-[70%]  sm:w-[30%] md:w-[270px] transition-transform duration-300"
            >
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
  )
}

export default Carusel


