// favoritesPage.tsx
import Favoriets from "@components/bouquetsGrid/bouquetGrid";
import OrderCTA from "@components/orderCTA/OrderCTA";
import { useAppSelector } from "@store/app/hook";
import { useLocation, useNavigate } from "react-router-dom";

const TITLE_NAME = 'Избранное';

const FavoritesPage = () => {
  const favoriteIds = useAppSelector(state => state.favoriets.favoriteIds);
  const allBouquets = useAppSelector(state => state.bouquets.items);
  const favoriteBouquets = allBouquets.filter(b => favoriteIds.includes(b._id));

  const navigate = useNavigate();
  const location = useLocation();

  if(favoriteBouquets.length === 0) {
    return (
      <div className="px-4 my-32 mx-auto md:w-[500px] md:mt-16">
        <OrderCTA 
          title={"В избранном нет букетов."}
          CTA={"Вы ничего не выбрали? Не беда, оставьте заявку! Мы с вяжемся с вами в течении 10 минут и подберем для вас тот букет который нужен именно вам! =)"}
        />
      </div>
    )
  }

  return (
    <Favoriets 
      bouquets={favoriteBouquets} 
      title={TITLE_NAME}
      shortDescription="Отличный выбор 👌"
      onViewBouquet={(b) => navigate(`/favorites/${b._id}`, { state: { backgroundLocation: location } })}
      className={"px-4 my-20 md:mt-5"}
    />
  )
}

export default FavoritesPage