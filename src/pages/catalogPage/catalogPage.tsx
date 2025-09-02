import Catalog from "@components/bouquetsGrid/bouquetGrid";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import BouquetModal from "@components/bouquetModal/BouquetModal";
import { createPortal } from "react-dom";

const CatalogPage = () => {
  const { category, bouquetId } = useParams<{ category?: string; bouquetId?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  const bouquetsByCategory = useAppSelector((state) => state.bouquet.bouquetsByCategory);
  const allBouquets = useAppSelector((state) => state.bouquet.items);

  // Если нет категории - показываем все букеты
  const catalogBouquets = category && category !== 'all' ? (bouquetsByCategory[category] || []) : allBouquets || [];

  // sort
  const sortedAsc = [...catalogBouquets].sort((a, b) => a.price - b.price)

  // Защита от undefined и фильтр по категории
  const filteredBouquets = category && category !== 'all'
    ? sortedAsc.filter((b) => b.categories?.includes(category))
    : sortedAsc;
    // ? catalogBouquets.filter((b) => b.categories?.includes(category))
    // : catalogBouquets;

  const title = category ? `Каталог: ${category}` : "Каталог букетов";
  const shortDescription = category
    ? `Все букеты категории ${category}`
    : "Широкий ассортимент — всегда свежие цветы на любой вкус 💐";

  useEffect(() => {
    if (category && !bouquetsByCategory[category]) {
      dispatch(fetchBouquetsByCategoryThunk(category));
    }
  }, [category, dispatch, bouquetsByCategory]);

  // По id букета для модалки
  const modalBouquet = bouquetId
    ? filteredBouquets.find((b) => b._id === bouquetId)
    : null;

  return (
    <>
      <Catalog
        bouquets={filteredBouquets}
        title={title}
        shortDescription={shortDescription}
        // onViewBouquet={(b) =>
        //   navigate(`/catalog/${category || ''}/${b._id}`, {
        //     state: { backgroundLocation: location },
        //   })
        // }
        onViewBouquet={(b) =>
          navigate(
            `/catalog/${category || 'all'}/${b._id}`.replace(/\/{2,}/g, '/'),
            {
              state: { backgroundLocation: location },
            }
          )
        }
        className="px-4 my-20 md:my-5"
        showSeeMoreCard={false}
      />

      {backgroundLocation && modalBouquet &&
        createPortal(
          <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default CatalogPage;

