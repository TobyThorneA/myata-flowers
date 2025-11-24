// favoritesPage.tsx
import Favoriets from "@components/bouquetsGrid/bouquetGrid";
import OrderCTA from "@components/orderCTA/OrderCTA";
import { useAppSelector } from "@store/app/hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BouquetModal from '@components/bouquetModal/BouquetModal';
import { createPortal } from 'react-dom';

const TITLE_NAME = 'Избранное';

const FavoritesPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const favoriteIds = useAppSelector(state => state.favoriets.favoriteIds);
  const allBouquets = useAppSelector(state => state.bouquet.items);
  const favoriteBouquets = allBouquets.filter(b => favoriteIds.includes(b._id));

    
  const { bouquetId } = useParams<{ bouquetId?: string }>();
  const bouquets = useAppSelector(state => state.bouquet.items);

  const modalBouquet = bouquetId ? bouquets.find(b => b._id === bouquetId) : null;

  // Получаем backgroundLocation из состояния (нужно, чтобы знать, есть ли фон)
  const backgroundLocation = location.state?.backgroundLocation;

    if (favoriteBouquets.length === 0) {
    return (
      <>
        <div className="my-36 md:mt-0">
          <OrderCTA 
            title={"В избранном нет букетов."}
            CTA={"Вы ничего не выбрали? Не беда, оставьте заявку! Мы с вяжемся с вами в течении 10 минут и подберем для вас тот букет который нужен именно вам! =)"}
            bgCollor=""
          />
        </div>
        {/* Модалка при отсутствии избранных */}
        {backgroundLocation && modalBouquet && createPortal(
          <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
          document.getElementById('modal-root')!
        )}
      </>
    );
  }

  return (
    <>
      <Favoriets 
        bouquets={favoriteBouquets} 
        title={TITLE_NAME}
        shortDescription="Отличный выбор 👌"
        onViewBouquet={
          (b) => 
            navigate(`/bouquet/${b._id}`, {
            state: { backgroundLocation: location },
          })
        }
        className="my-20 md:mt-5"
      />
      {/* Модалка при наличии избранных */}
      {backgroundLocation && modalBouquet && createPortal(
        <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
        document.getElementById('modal-root')!
      )}
    </>
  );
}

export default FavoritesPage