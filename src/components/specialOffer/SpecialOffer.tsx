import OrderButton from "@components/orderButton/OrderButton";
import { useAppSelector } from "@store/app/hook";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import SpecialOfferCardRectangle from "./SpecialOfferCardRectangle";
import SpecialOfferCardSquare from "./SpecialOfferCardSquare";

const categoryNames: Record<string, string> = {
  rosemom: "Розы",
  pionmom: "Кустовые Розы",
  hrissmam: "Хризантемы",
  mixmom: "Сборные",
  staymom: "Стойкие",
  gigamom: "Гиганты",
  boxmom: "Композиции",
  avtor: "Авторские",
  // добавляешь свои
};

const SpecialOffer = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const allBouquets = useAppSelector((state) => state.bouquet.items);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const normalizedCategory = category?.replace(/-/g, " ") ?? " ";

  const readableCategory = categoryNames[category ?? ""] ?? "";

  const bouquets = allBouquets.filter((b) => b.categories?.includes(normalizedCategory));
  const sorted = [...bouquets].sort((a, b) => a.price - b.price);

  return (
    <div className="mt-16 bg-bg-collor px-4 pb-16 font-cursive md:mt-0 md:px-8">
      {/* Заголовок акции */}
      <h2 className="mb-8 pt-4 text-center font-cursive text-2xl font-normal text-color-text md:text-5xl">
        Специальное предложение
        {readableCategory && ` (${readableCategory})`}
      </h2>

      {/* Сетка с букетами */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:items-stretch">
        {sorted.map((bouquet, i) =>
          i < 2 ? (
            <SpecialOfferCardSquare
              key={bouquet._id}
              bouquet={bouquet}
              onViewBouquet={(b) =>
                navigate(`/bouquet/${b._id}`, { state: { backgroundLocation: location } })
              }
            />
          ) : (
            <SpecialOfferCardRectangle
              key={bouquet._id}
              bouquet={bouquet}
              onViewBouquet={(b) =>
                navigate(`/bouquet/${b._id}`, { state: { backgroundLocation: location } })
              }
            />
          ),
        )}
      </div>
      <div className="mt-5 flex flex-col items-center justify-center font-main">
        <p className="md:text-md mb-5 text-center text-xs">
          Не знаете, что выбрать? Просто оставьте заявку! Мы свяжемся с вами и поможем подобрать
          идеальный букет для Вас 😉
        </p>
        <OrderButton />
      </div>
    </div>
  );
};

export default SpecialOffer;
