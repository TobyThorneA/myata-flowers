// =========================
// src/pages/CatalogPage.tsx
// =========================

import BouquetModal from "@components/bouquetModal/BouquetModal";
import Catalog from "@components/bouquetsGrid/bouquetGrid";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CatalogPage = () => {
  const { category, bouquetId } = useParams<{ category?: string; bouquetId?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const handleOrderClick = (bouquetName?: string) => {
  //   navigate('/order', {
  //     state: {
  //       from: location.pathname + location.search, // сохраняем путь + query
  //       scrollY: window.scrollY,                   // для восстановления скролла
  //       bouquetName,
  //       watchField: false
  //     }
  //   });
  // };

  const backgroundLocation = location.state?.backgroundLocation;

  const bouquetsByCategory = useAppSelector((state) => state.bouquet.bouquetsByCategory);
  const allBouquets = useAppSelector((state) => state.bouquet.items);

  // Если нет категории - показываем все букеты
  const catalogBouquets =
    category && category !== "all" ? bouquetsByCategory[category] || [] : allBouquets || [];

  // sort
  const sortedAsc = [...catalogBouquets].sort((a, b) => a.price - b.price);

  // Защита от undefined и фильтр по категории
  const filteredBouquets =
    category && category !== "all"
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
  const modalBouquet = bouquetId ? filteredBouquets.find((b) => b._id === bouquetId) : null;

  return (
    <>
      <Catalog
        bouquets={filteredBouquets}
        title={title}
        shortDescription={shortDescription}
        onViewBouquet={(b) =>
          navigate(`/catalog/${category || "all"}/${b._id}`.replace(/\/{2,}/g, "/"), {
            state: { backgroundLocation: location },
          })
        }
        className="my-20 md:mt-5"
        showSeeMoreCard={false}
      />

      {backgroundLocation &&
        modalBouquet &&
        createPortal(
          <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
          document.getElementById("modal-root")!,
        )}
    </>
  );
};

export default CatalogPage;
