import Catalog from "@components/bouquetsGrid/bouquetGrid"
import { useAppSelector } from "@store/app/hook"
import { useLocation, useNavigate } from "react-router-dom";

const TITLE_NAME = 'Каталог букетов';

const CatalogPage = () => {
  const catalogBouquets = useAppSelector(state => state.bouquets.items)
  const navigate = useNavigate();
  const location = useLocation();

  return (
    (
      <Catalog 
        bouquets={catalogBouquets} 
        title={TITLE_NAME}
        onViewBouquet={(b) => navigate(`/catalog/${b._id}`, { state: { backgroundLocation: location } })}
        shortDescription="Широкий ассортимент всегда свежие цветы на любой вкус 💐"
        className={"px-4 my-20 md:my-5"}
      />
    )
  )
}

export default CatalogPage