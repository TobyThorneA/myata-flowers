// =========================
// src/pages/CatalogPage.tsx
// =========================

import BouquetModal from "@components/bouquetModal/BouquetModal";
import Catalog from "@components/bouquetsGrid/bouquetGrid";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getCategoryByApiKey } from "../../shared/categories/lib/getCategoryByApiKey";
import { getCategoryBySlug } from "../../shared/categories/lib/getCategoryBySlug";

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
  const routeCategory = category ? decodeURIComponent(category) : undefined;
  const categoryConfig = getCategoryBySlug(routeCategory) ?? getCategoryByApiKey(routeCategory);
  const categoryApiKey =
    categoryConfig?.filter.type === "apiKey" ? categoryConfig.filter.apiKey : routeCategory;
  const shouldUseApiCategory =
    categoryApiKey !== undefined &&
    categoryApiKey !== "all" &&
    (categoryConfig === undefined || categoryConfig.filter.type === "apiKey");

  // Если нет категории - показываем все букеты
  const catalogBouquets = (() => {
    if (!routeCategory || routeCategory === "all") return allBouquets || [];

    if (!categoryConfig) return bouquetsByCategory[routeCategory] || [];

    const categoryFilter = categoryConfig.filter;

    switch (categoryFilter.type) {
      case "apiKey":
        return bouquetsByCategory[categoryFilter.apiKey] || [];
      case "priceMax":
        return (allBouquets || []).filter((bouquet) => bouquet.price <= categoryFilter.priceMax);
      case "priceMin":
        return (allBouquets || []).filter((bouquet) => bouquet.price >= categoryFilter.priceMin);
      case "sameDayDelivery":
        return (allBouquets || []).filter((bouquet) => bouquet.available);
      default:
        return allBouquets || [];
    }
  })();

  // sort
  const sortedAsc = [...catalogBouquets].sort((a, b) => a.price - b.price);

  // Защита от undefined и фильтр по категории
  const filteredBouquets = shouldUseApiCategory
    ? sortedAsc.filter((b) => b.categories?.includes(categoryApiKey))
    : sortedAsc;
  // ? catalogBouquets.filter((b) => b.categories?.includes(category))
  // : catalogBouquets;

  const categoryTitle = categoryConfig?.title ?? routeCategory;
  const title =
    categoryTitle && categoryTitle !== "all" ? `Каталог: ${categoryTitle}` : "Каталог букетов";
  const shortDescription =
    categoryTitle && categoryTitle !== "all"
      ? (categoryConfig?.description ?? `Все букеты категории ${categoryTitle}`)
      : "Широкий ассортимент — всегда свежие цветы на любой вкус 💐";
  const seoTitle = categoryConfig?.seo.title ?? "Каталог букетов Myata Flowers";
  const seoDescription =
    categoryConfig?.seo.description ??
    "Каталог букетов Myata Flowers: свежие цветы, удобный заказ и доставка.";
  const canonicalPath = categoryConfig?.seo.canonicalPath ?? "/catalog";

  useEffect(() => {
    if (shouldUseApiCategory && !bouquetsByCategory[categoryApiKey]) {
      dispatch(fetchBouquetsByCategoryThunk(categoryApiKey));
    }
  }, [categoryApiKey, dispatch, bouquetsByCategory, shouldUseApiCategory]);

  // По id букета для модалки
  const modalBouquet = bouquetId ? filteredBouquets.find((b) => b._id === bouquetId) : null;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://www.myata-flowers.ru${canonicalPath}`} />
      </Helmet>

      <Catalog
        bouquets={filteredBouquets}
        title={title}
        shortDescription={shortDescription}
        onViewBouquet={(b) =>
          navigate(
            `/catalog/${categoryConfig?.slug ?? routeCategory ?? "all"}/${b._id}`.replace(
              /\/{2,}/g,
              "/",
            ),
            {
              state: { backgroundLocation: location },
            },
          )
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
