import Promo from "@components/bouquetsGrid/bouquetGrid"
import { useAppSelector } from "@store/app/hook"
import { useLocation, useNavigate } from "react-router-dom";

const TITLE_NAME = "Букеты по акции"

const PromoPage = () =>  {
  const promoBouquets = useAppSelector(state => state.bouquets.items.slice(2,5));
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Promo 
      bouquets={promoBouquets} 
      title={TITLE_NAME}
      shortDescription="Приятные цены, скидки на доставку до 100% ✨"
      onViewBouquet={(b) => navigate(`/promo/${b._id}`, { state: { backgroundLocation: location } })}
      className={"px-4 my-20 md:mt-5"}
    />
  )
}

export default PromoPage