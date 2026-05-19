import BouquetModal from "@components/bouquetModal/BouquetModal";
import BouquetsGrid from "@components/bouquetsGrid/bouquetGrid";
import Carusel from "@components/carousel/Carusel";
import DeliveryDicoration from "@components/delivery-and-dicoration/DeliveryDicoration";
import OrderCTA from "@components/orderCTA/OrderCTA";
import ProductDescription from "@components/productDescription/ProductDescription";
import Reviwes from "@components/reviews/Reviews";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { fetchBouquetsByCategoryThunk } from "@store/slices/bouquetSlice";
import { useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { HOME_CATALOG_CATEGORIES } from "../../shared/categories/config/catalogCategories";
// import SpecialOfferPage from "@pages/specialOfferPage/SpecialOfferPage";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state as { scrollY?: number } | undefined;

  useLayoutEffect(() => {
    if (state?.scrollY !== undefined) {
      window.scrollTo(0, state.scrollY);
    }
  }, [state?.scrollY]);

  const bouquetsByCategory = useAppSelector((state) => state.bouquet.bouquetsByCategory);

  const { bouquetId } = useParams<{ bouquetId?: string }>();
  const bouquets = useAppSelector((state) => state.bouquet.items);

  const modalBouquet = bouquetId ? bouquets.find((b) => b._id === bouquetId) : null;

  // Получаем backgroundLocation из состояния (нужно, чтобы знать, есть ли фон)
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    HOME_CATALOG_CATEGORIES.forEach((category) => {
      if (category.filter.type === "apiKey") {
        dispatch(fetchBouquetsByCategoryThunk(category.filter.apiKey));
      }
    });
  }, [dispatch]);

  return (
    <div className="pt-12 md:pt-0">
      {/* <SpecialOfferPage /> */}
      <Carusel />
      <div className="mb-5">
        <OrderCTA
          title={"Незнаете какой букет выбрать?"}
          CTA={
            "Оставьть заявку, мы свяжемся с вами в течении 10 минут и подберем тот букет который нужен именно Вам"
          }
        />
      </div>

      {HOME_CATALOG_CATEGORIES.map((bouquetCategory) => {
        const categoryApiKey =
          bouquetCategory.filter.type === "apiKey" ? bouquetCategory.filter.apiKey : undefined;
        const bouquetsInCategory = categoryApiKey ? bouquetsByCategory[categoryApiKey] || [] : [];

        // sort
        const sortedAsc = [...bouquetsInCategory].sort((a, b) => a.price - b.price);

        return (
          <BouquetsGrid
            key={bouquetCategory.id}
            title={bouquetCategory.title}
            bouquets={(sortedAsc || []).slice(0, 9)}
            shortDescription={bouquetCategory.description}
            // маршрут надо вынести в константу
            onViewBouquet={(b) =>
              navigate(`/bouquet/${b._id}`, { state: { backgroundLocation: location } })
            }
            className="my-10 md:mt-0"
            showSeeMoreCard={true}
            onSeeMoreClick={() => navigate(`/catalog/${bouquetCategory.slug}`)}
          />
        );
      })}
      <ProductDescription />
      <DeliveryDicoration />
      <Reviwes />
      <OrderCTA
        title={"Ничего не нашли?"}
        CTA={
          "Оставьть заявку, мы свяжемся с вами в течении 10 минут и подберем тот букет который нужен именно вам"
        }
        bgCollor=""
      />

      {/* Рендер модалки поверх, если есть backgroundLocation и букет */}
      {backgroundLocation &&
        modalBouquet &&
        createPortal(
          <BouquetModal bouquet={modalBouquet} onClose={() => navigate(-1)} />,
          document.getElementById("modal-root")!,
        )}
    </div>
  );
};

export default MainPage;
