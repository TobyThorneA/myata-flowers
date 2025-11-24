import Promo from "@components/bouquetsGrid/bouquetGrid"
import { useAppDispatch, useAppSelector } from "@store/app/hook"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import { selectBouquetsByCategory } from "@store/selectors/bouquetSelectors";
import BouquetModal from '@components/bouquetModal/BouquetModal';
import { createPortal } from 'react-dom';

const TITLE_NAME = "Букеты по акции"
const CATEGORY_NAME = "Акция"

const PromoPage = () =>  {
  const promoBouquets = useAppSelector(state => selectBouquetsByCategory(state, CATEGORY_NAME));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // sort
  const sortedAsc = [...promoBouquets].sort((a, b) => a.price - b.price)
  
  const { bouquetId } = useParams<{ bouquetId?: string }>();
  const bouquets = useAppSelector(state => state.bouquet.items);

  const modalBouquet = bouquetId ? bouquets.find(b => b._id === bouquetId) : null;

  // Получаем backgroundLocation из состояния (нужно, чтобы знать, есть ли фон)
  const backgroundLocation = location.state?.backgroundLocation;




    useEffect(() => {
    dispatch(fetchBouquetsByCategoryThunk(CATEGORY_NAME));
  }, [dispatch]);



  return (
    <>
      <Promo 
        bouquets={sortedAsc}
        title={TITLE_NAME}
        shortDescription="Приятные цены, скидки на доставку до 100% ✨"
        onViewBouquet={(b) => navigate(`/promo/${b._id}`, { state: { backgroundLocation: location } })}
        className="my-20 md:mt-5"
      />
      {/* Рендер модалки поверх, если есть backgroundLocation и букет */}
      {backgroundLocation && modalBouquet &&
        createPortal(
          <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
          document.getElementById('modal-root')!
        )
      }
    </>
  )
}

export default PromoPage