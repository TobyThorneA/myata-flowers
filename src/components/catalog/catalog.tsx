// catalog.tsx
import { useAppSelector } from "@store/app/hook";
import "./catalog.scss"
import Header from "@components/header/Header";
import { type Bouquet } from "../../mocks/productsData"
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";
import { useLocation, useNavigate } from "react-router-dom";

const Catalog = () => {

  const location = useLocation(); 
  const bouquets = useAppSelector(store => store.bouquets.items)
   const navigate = useNavigate();

    const handleViewBouquet = (bouquet: Bouquet) => {
    window.ym?.(102322325, 'reachGoal', 'bouquet_view', {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    // Навигация с сохранением background для модалки на новой странице
    navigate(`/store/${bouquet._id}`, { state: { backgroundLocation: location } });
  };

    return (
      <>
        <Header />
       <div className="catalog">
      <h1 className="catalog__title">Каталог букетов</h1>
      <div className="catalog__grid">
        {bouquets?.map(bouquet => (
          <BouquetCardCompact 
            bouquet={bouquet}
            onClick={() => handleViewBouquet(bouquet)}
          />
        ))}
      </div>
    </div>
      </>
  )
};

export default Catalog;